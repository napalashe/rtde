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
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch documents" },
      { status: 500 }
    );
  }
}
