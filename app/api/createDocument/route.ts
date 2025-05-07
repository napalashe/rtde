import { NextRequest, NextResponse } from "next/server";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

export async function POST(req: NextRequest) {
  const client = generateClient<Schema>();
  const { title } = await req.json();
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  try {
    const { data, errors } = await client.models.Document.create({
      title,
      content: "",
    });
    if (errors) {
      return NextResponse.json({ error: errors }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Failed to create document" },
      { status: 500 }
    );
  }
}
