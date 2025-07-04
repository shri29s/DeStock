
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    const response = await fetch(`http://localhost:3000/trades/${params.companyId}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trade history' }, { status: 500 });
  }
}
