import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const districtIdStr = searchParams.get('districtId');

  try {
    // Convert string ID to number to match Prisma's expected type
    const districtId = districtIdStr ? parseInt(districtIdStr, 10) : undefined;

    const taluks = await prisma.taluk.findMany({
      // If districtId is NaN or undefined, it will skip the filter
      where: districtId ? {
        district_id: districtId
      } : undefined, 
      
      distinct: ['taluk_name'],
      select: {
        taluk_id: true, 
        taluk_name: true,
      },
      orderBy: {
        taluk_name: 'asc',
      },
    });

    return NextResponse.json(taluks);
  } catch (error) {
    console.error('Error fetching taluks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch taluks' }, 
      { status: 500 }
    );
  }
}