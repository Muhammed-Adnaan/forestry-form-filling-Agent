/**
 * Form-filling LiveKit Agent — Standard Pipeline
 *
 * Run: pnpm dev:agent
 */

import dotenv from 'dotenv';
dotenv.config({ path: ['.env.local', '.env'] });

import path from 'node:path';
import url from 'node:url';
import { z } from 'zod';
import {
    type JobContext,
    WorkerOptions,
    cli,
    defineAgent,
    llm,
    voice,
} from '@livekit/agents';
import * as deepgram from '@livekit/agents-plugin-deepgram';
import * as openai from '@livekit/agents-plugin-openai';
import * as google from '@livekit/agents-plugin-google';
import * as silero from '@livekit/agents-plugin-silero';
import * as livekit from '@livekit/agents-plugin-livekit';
// import * as LivekitNC from '@livekit/noise-cancellation-node';
import { BackgroundVoiceCancellation } from '@livekit/noise-cancellation-node';

// ─── 1. TOOL DEFINITIONS (Standard) ───────────────────────────────────────────

function makeFormTools(ctx: JobContext) {
    const getBrowserIdentity = () => {
        const participants = Array.from(ctx.room.remoteParticipants.values());
        if (participants.length === 0) throw new Error('No browser participant connected.');
        return participants[0].identity;
    };

    const getFormDetails = llm.tool({
        description: 'Reads the form state. Call this first.',
        parameters: z.object({}), // Standard Pipeline handles empty objects fine!
        execute: async () => {
            console.log('� Checking form via RPC...');
            try {
                const identity = getBrowserIdentity();
                const response = await ctx.room.localParticipant?.performRpc({
                    destinationIdentity: identity,
                    method: 'getFormDetails',
                    payload: '',
                    responseTimeout: 4000,
                });
                return `Form State: ${response}`;
            } catch (err) {
                return `Error: ${String(err)}`;
            }
        },
    });

    const fillFormFields = llm.tool({
        description: 'Updates form fields. IMPORTANT: You MUST pass the updates nested inside the "fields" property. Example: { "fields": { "hobli": "kasaba" } }',
        parameters: z.object({
            fields: z.record(z.string(), z.string()).describe('Key-value pairs to update (e.g., {"hobli": "kasaba"}).'),
        }),
        execute: async ({ fields }) => {
            console.log('✍️ Updating form:', fields);
            try {
                const identity = getBrowserIdentity();
                await ctx.room.localParticipant?.performRpc({
                    destinationIdentity: identity,
                    method: 'fillFormDetails',
                    payload: JSON.stringify(fields),
                    responseTimeout: 4000,
                });
                return "Success: Form updated.";
            } catch (err) {
                return `Error: ${String(err)}`;
            }
        },
    });

    return { get_form_details: getFormDetails, fill_form_fields: fillFormFields };
}

// ─── 2. AGENT CONFIGURATION (Standard Pipeline) ───────────────────────────────

class FormAssistant extends voice.Agent {
    constructor(ctx: JobContext) {
        super({
            // INSTRUCTIONS
            instructions: `You are a helpful voice assistant.
                1. First, check the form state using 'get_form_details'.
                2. Greet the user and ask for missing details.
                3. Use 'fill_form_fields' to update the form.
                4. keep it short and conversational
                5. just ask one - two  question at a time`,

            // TOOLS
            tools: makeFormTools(ctx),

            // PIPELINE COMPONENTS
            // 1. STT (Hearing): Deepgram STTv2 (matching agent.py flux-general-en)
            // turnDetection: "stt",
            // turnDetection: new livekit.turnDetector.MultilingualModel(),
            // llm: new google.beta.realtime.RealtimeModel({
            //     model: "gemini-2.5-flash-native-audio-preview-12-2025",
            //     realtimeInputConfig: {
            //         automaticActivityDetection: {
            //             disabled: true,
            //         },
            //     },
            // }),
            llm: new openai.realtime.RealtimeModel({
                // model: "gpt-4o-realtime-preview-2024-10-01",
                model: "gpt-realtime-mini",
                voice: "ash",
                turnDetection: {
                    type: 'server_vad',
                    threshold: 0.4,
                    prefix_padding_ms: 350,
                    silence_duration_ms: 500,
                    create_response: true,
                    interrupt_response: true,
                },
            }),
            tts: new openai.TTS({
                model: "gpt-4o-mini-tts",
                voice: "ash",
                instructions: "speak in the language user is speaking in.",
            }
            ),
            // stt: "deepgram/nova-3",
            // turnDetection: new livekit.turnDetector.MultilingualModel(),
            // stt: new deepgram.STT({
            //     model: "nova-2-general",
            // }),

            // // 2. LLM (Thinking): OpenAI Plugin routing to Ollama
            // llm: new openai.LLM({
            //     baseURL: 'http://localhost:11434/v1',
            //     apiKey: 'ollama', // Required but dummy key
            //     model: 'gpt-oss:120b-cloud',
            //     temperature: 0.7,
            // }),

            // // 3. TTS (Speaking): Deepgram TTS (matching agent.py aura-2-asteria-en)
            // tts: new deepgram.TTS({
            //     model: 'aura-2-asteria-en', // The asteria voice model from agent.py
            // }),
        });
    }
}

// ─── 3. ENTRY POINT ───────────────────────────────────────────────────────────

export default defineAgent({
    entry: async (ctx: JobContext) => {
        console.log(`Connecting to room ${ctx.room.name}`);
        await ctx.connect();

        // Matching Silero VAD from agent.py
        const vad = await silero.VAD.load({
            minSpeechDuration: 0.3,
            minSilenceDuration: 0.7,
        });

        // Initialize AgentLogic
        const agent = new FormAssistant(ctx);

        const session = new voice.AgentSession({
            vad: vad,
        });

        // Print Deepgram STT results to console
        session.on(voice.AgentSessionEventTypes.UserInputTranscribed, (msg) => {
            if (msg.isFinal) {
                console.log('🗣️ User Said:', msg.transcript);
            }
        });

        await session.start({
            room: ctx.room, agent: agent, inputOptions: {
                noiseCancellation: BackgroundVoiceCancellation(),
            },
        });
        // await session.say(
        //     'Hello. How can I help you today?',
        //     {
        //         allowInterruptions: false,
        //     }
        // );

        // Optional: Initial greeting matching agent.py
        // await agent.tts.say("Hello! I can help you fill out this form.");
    },
});

// ─── RUNNER ───────────────────────────────────────────────────────────────────

const isMain =
    process.argv[1] === url.fileURLToPath(import.meta.url) ||
    process.argv[1] === path.resolve('agent.ts');

if (isMain) {
    cli.runApp(new WorkerOptions({ agent: url.fileURLToPath(import.meta.url) }));
}