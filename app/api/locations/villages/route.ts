import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const talukIdStr = searchParams.get('talukId');

  try {
    // 1. Parse the ID to a number to match Prisma's integer type
    const talukId = talukIdStr ? parseInt(talukIdStr, 10) : undefined;

    const villages = await prisma.village.findMany({
      // 2. Only filter if a valid talukId is provided
      where: talukId
        ? {
            taluk_id: talukId,
          }
        : undefined,

      // 3. Ensure unique names in the dropdown
      distinct: ['village_name'],

      // 4. Select only the necessary fields for a smaller payload
      select: {
        village_id: true,
        village_name: true,
      },

      // 5. Alphabetical sorting
      orderBy: {
        village_name: 'asc',
      },
    });

    return NextResponse.json(villages);
  } catch (error) {
    console.error('Error fetching villages:', error);
    return NextResponse.json({ error: 'Failed to fetch villages' }, { status: 500 });
  }
}
