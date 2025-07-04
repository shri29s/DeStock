import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { companyId: string } }
) {
  const { companyId } = context.params;

  try {
    const response = await fetch(
      `http://localhost:3000/shareholders/${companyId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch shareholders" },
      { status: 500 }
    );
  }
}
