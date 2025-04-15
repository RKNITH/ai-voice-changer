import { ElevenLabsClient } from "elevenlabs";
import * as fs from "fs";
import { Readable } from "stream";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVEN_LABS_API_KEY!,
});

/**
 * Converts voice and returns a File object.
 * @param filePath - Path to input audio file
 * @param voiceId - Target voice ID
 * @returns {Promise<File>} - Converted audio as a File object
 */
export async function convertVoice(
  filePath: string,
  voiceId: string
): Promise<File> {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error("File does not exist.");
    }

    // Call ElevenLabs API (returns a stream)
    const response = await client.speechToSpeech.convert(voiceId, {
      audio: fs.createReadStream(filePath),
      output_format: "mp3_44100_128",
      model_id: "eleven_multilingual_sts_v2",
    });

    // Read the stream into a buffer
    const stream = Readable.from(response);
    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);

    // Create a Blob and convert to File
    const audioBlob = new Blob([audioBuffer], { type: "audio/mpeg" });
    const file = new File([audioBlob], `processed-${Date.now()}.mp3`, {
      type: "audio/mpeg",
    });

    return file;
  } catch (error) {
    console.error("Error converting voice:", error);
    throw error;
  }
}
