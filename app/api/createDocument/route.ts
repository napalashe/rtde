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
    if (!data) {
      return NextResponse.json(
        { error: "No data returned from create operation" },
        { status: 500 }
      );
    }
    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to create document";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
