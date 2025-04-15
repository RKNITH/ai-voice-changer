import { NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVEN_LABS_API_KEY!,
});

export async function GET() {
  try {
    const voices = await client.voices.getAll();
    return NextResponse.json({ success: true, voices });
  } catch (error) {
    console.error("Error fetching voices:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch voices" },
      { status: 500 }
    );
  }
}
