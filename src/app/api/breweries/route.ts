import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const params = new URLSearchParams(searchParams);
  const apiUrl = `https://api.openbrewerydb.org/v1/breweries?${params.toString()}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return NextResponse.json(data);
}
