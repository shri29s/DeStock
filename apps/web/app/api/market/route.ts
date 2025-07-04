import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');

  if (type === 'companies') {
    try {
      const res = await fetch('http://localhost:3000/prices/all');
      const data = await res.json();
      return NextResponse.json({ companies: data });
    } catch (error) {
      console.error('Failed to fetch companies from backend:', error);
      return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
}