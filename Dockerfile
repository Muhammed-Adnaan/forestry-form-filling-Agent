# ────────────────────────────────────────────────────────────────────────────
# Stage 1 – deps
#   Install ALL dependencies (prod + dev) so we can build later.
#   We keep node_modules here and copy only what the next stage needs.
# ────────────────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS deps

# better-sqlite3 is a native addon – needs build tools
RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# Enable corepack so we can use the pnpm version locked in package.json
RUN corepack enable

WORKDIR /app

# Copy manifests first for layer-cache efficiency
COPY package.json pnpm-lock.yaml ./

# Install all deps (including devDeps needed for build)
RUN pnpm install --frozen-lockfile


# ────────────────────────────────────────────────────────────────────────────
# Stage 2 – builder
#   Build the Next.js app and the embed-popup webpack bundle.
# ────────────────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS builder

RUN corepack enable

WORKDIR /app

# Bring in installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the source
COPY . .

# Generate Prisma client before building
RUN npx prisma generate

# Build Next.js + webpack embed-popup script
# Pass dummy env vars so the build doesn't fail on missing NEXT_PUBLIC_* values.
# Real values are injected at runtime via --env-file / -e flags.
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ARG NEXT_PUBLIC_CONN_DETAILS_ENDPOINT=http://localhost:3000/api/connection-details
ENV NEXT_PUBLIC_CONN_DETAILS_ENDPOINT=$NEXT_PUBLIC_CONN_DETAILS_ENDPOINT

RUN pnpm build


# ────────────────────────────────────────────────────────────────────────────
# Stage 3 – runner
#   Lean production image – only prod deps + built output.
# ────────────────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS runner

# better-sqlite3 native addon needs libstdc++ at runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
      libstdc++6 \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy built Next.js output
COPY --from=builder /app/public       ./public
COPY --from=builder /app/.next        ./.next
COPY --from=builder /app/next.config.ts ./next.config.ts

# Copy Prisma schema & generated client
COPY --from=builder /app/prisma       ./prisma
COPY --from=builder /app/lib/generated ./lib/generated

# Copy package manifests and install PROD-only deps
COPY --from=builder /app/package.json  ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile --prod

# Copy the SQLite database file (used by better-sqlite3 / Prisma)
# If you mount a volume for the DB at runtime, this acts as a default.
COPY --from=builder /app/kar.db ./kar.db

# Copy agent scripts (used by `pnpm dev:agent`)
COPY --from=builder /app/agent.ts     ./agent.ts
COPY --from=builder /app/agent.py     ./agent.py
COPY --from=builder /app/app-config.ts ./app-config.ts
COPY --from=builder /app/models.json  ./models.json

USER nextjs

EXPOSE 3000

# Runtime environment variables – pass real values with
#   docker run --env-file .env  OR  -e LIVEKIT_API_KEY=...
ENV LIVEKIT_API_KEY=""
ENV LIVEKIT_API_SECRET=""
ENV LIVEKIT_URL=""
ENV NEXT_PUBLIC_CONN_DETAILS_ENDPOINT="http://localhost:3000/api/connection-details"

CMD ["pnpm", "start"]
