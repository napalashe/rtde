import { NextResponse } from "next/server";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

export async function GET() {
  const client = generateClient<Schema>();
  try {
    const { data, errors } = await client.models.Document.list();
    if (errors) {
      return NextResponse.json({ error: errors }, { status: 500 });
    }
    // Ensure data is always an array
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to fetch documents";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
