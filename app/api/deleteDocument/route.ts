import { NextRequest, NextResponse } from "next/server";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

export async function DELETE(req: NextRequest) {
  const client = generateClient<Schema>();
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json(
      { error: "Document ID is required" },
      { status: 400 }
    );
  }
  try {
    const { data, errors } = await client.models.Document.delete({ id });
    if (errors) {
      return NextResponse.json({ error: errors }, { status: 500 });
    }
    return NextResponse.json({ message: "Document deleted", data });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to delete document";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
