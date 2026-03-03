import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const districts = await prisma.district.findMany({
      where: {}, // Optional: Add filters here if needed
      distinct: ['district_name'],
      select: {
        district_id: true, // Usually needed for React 'key' props
        district_name: true,
      },
      orderBy: {
        district_name: 'asc',
      },
    });
    // console.log(districts);
    return NextResponse.json(districts);
  } catch (error) {
    console.error('Error fetching districts:', error);
    return NextResponse.json({ error: 'Failed to fetch districts' }, { status: 500 });
  }
}
