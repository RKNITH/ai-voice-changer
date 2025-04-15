import { NextRequest, NextResponse } from "next/server";
import { convertVoice } from "@/utils/aiProcessor";
import { writeFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs"; // Ensure it runs in Node.js

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("audio") as File;
    const voiceId = formData.get("voice") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save uploaded file temporarily
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const tempFilePath = path.join("/tmp", file.name);
    await writeFile(tempFilePath, fileBuffer);

    // Convert voice and get File object
    const processedFile = await convertVoice(tempFilePath, voiceId);

    // Return processed file as response
    return new Response(processedFile, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="${processedFile.name}"`,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Voice processing failed" },
      { status: 500 }
    );
  }
}
