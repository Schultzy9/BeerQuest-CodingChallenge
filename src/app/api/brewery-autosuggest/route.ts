import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  if (!query) return NextResponse.json([], { status: 200 });

  const apiUrl = `https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(query)}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return NextResponse.json(data);
}
