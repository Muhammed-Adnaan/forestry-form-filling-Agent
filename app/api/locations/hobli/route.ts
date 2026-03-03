import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY ?? '');

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const talukName = searchParams.get('talukName');

  if (!talukName) {
    return NextResponse.json({ error: 'talukName is required' }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0,
        maxOutputTokens: 1024,
      },
    });

    const prompt =
      `List all the hoblis (administrative subdivisions) in the "${talukName}" taluk of Karnataka, India. ` +
      'Return a JSON object with a single key "hoblis" whose value is an array of objects, each with:\n' +
      '- "hobli_id": a lowercase slug (e.g. "kasaba", "north_hobli") derived from the hobli name\n' +
      '- "hobli_name": the proper display name (e.g. "Kasaba", "North Hobli")\n' +
      'Example: {"hoblis": [{"hobli_id": "kasaba", "hobli_name": "Kasaba"}]}';

    const result = await model.generateContent(prompt);
    const rawContent = result.response.text();
    // console.log('[hobli] Gemini raw response:', rawContent);

    // Guard: model returned nothing
    if (!rawContent || rawContent.trim() === '') {
      console.warn('[hobli] Gemini returned empty content for taluk:', talukName);
      return NextResponse.json([]);
    }

    // Extract JSON object from response (handles markdown fences or extra prose)
    const jsonMatch = rawContent.match(/(\{[\s\S]*\})/)?.[0] ?? '{"hoblis":[]}';

    let parsed: { hoblis?: { hobli_id: string; hobli_name: string }[] };
    try {
      parsed = JSON.parse(jsonMatch);
    } catch {
      console.error('[hobli] Failed to parse Gemini response as JSON. Raw:', rawContent);
      return NextResponse.json([]);
    }

    const hoblis: { hobli_id: string; hobli_name: string }[] = parsed.hoblis ?? [];
    return NextResponse.json(hoblis);
  } catch (error) {
    console.error('Error fetching hoblis from Gemini:', error);
    return NextResponse.json({ error: 'Failed to fetch hoblis' }, { status: 500 });
  }
}
