"use client";
import AudioPlayer from "@/components/audio-player";
const MicrophoneRecorder = dynamic(
  () => import("@/components/audio-recorder"),
  {
    ssr: false,
  }
);
import Voices from "@/components/voices";
import { SubmitIcon, UplaodIcon, VoiceIcon } from "@/icons";
import { Voice } from "@/utils/types";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import UploadArea from "./upload-area";

export default function Container() {
  const [file, setFile] = useState<File | null>(null);
  const [voice, setVoice] = useState("");
  const [processedFile, setProcessedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [voices, setVocies] = useState<Voice[]>([]);
  const [showRecordingArea, setShowRecordingArea] = useState<boolean>(false);

  useEffect(() => {
    const getVoices = async () => {
      try {
        const response = await fetch("/api/getVoices");
        const data = await response.json();
        if (data.success) {
          setVocies(data.voices.voices);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    getVoices();
  }, []);

  const uploadAndChangeVoice = async () => {
    if (!file || !voice) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("audio", file);
    formData.append("voice", voice);

    try {
      const response = await fetch("/api/voiceChanger", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Failed to process audio");
        setLoading(false);
        return;
      }

      const audioBlob = await response.blob();
      const audioFile = new File([audioBlob], "processed.mp3", {
        type: "audio/mpeg",
      });
      setProcessedFile(audioFile);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };
  return (
    <div className="group relative w-full min-[850px]:w-[calc(100%-20rem)]">
      <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10">
        <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-sky-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
        <div className="absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-gradient-to-br from-sky-500/20 to-cyan-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
        <div className="relative  p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3
                className="text-lg font-semibold text-white flex items-center gap-1 cursor-pointer"
                onClick={() => setFile(null)}
              >
                <VoiceIcon />
                Ai Voice Changer
              </h3>
              <p className="text-sm text-slate-400">
                Transform your audio by selecting from a variety of voices,
                allowing you to sound like a different person instantly.
              </p>
            </div>
            <div className="rounded-lg bg-cyan-500/10 p-2">
              <UplaodIcon />
            </div>
          </div>
          <div className="group/dropzone mt-6">
            <div className="relative w-full h-full md:h-[450px] rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/50 p-8 transition-colors group-hover/dropzone:border-cyan-500/50 flex items-center justify-center">
              {file ? (
                <div
                  className="md:grid"
                  style={{ gridTemplateColumns: "1.5fr 1fr" }}
                >
                  <Voices
                    voicesData={voices}
                    voiceId={voice}
                    setVoice={setVoice}
                  />
                  {file && (
                    <div className="mt-6 space-y-4">
                      <AudioPlayer file={file} />
                      {processedFile && (
                        <AudioPlayer file={processedFile} isProcessed />
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {showRecordingArea ? (
                    <MicrophoneRecorder
                      setShowRecordingArea={setShowRecordingArea}
                      setFile={setFile}
                    />
                  ) : (
                    <UploadArea
                      setFile={setFile}
                      setProcessedFile={setProcessedFile}
                      setShowRecordingArea={setShowRecordingArea}
                      setVoice={setVoice}
                    />
                  )}
                </>
              )}
            </div>
          </div>
          {file && (
            <div className="mt-6 w-full flex justify-end">
              <button
                onClick={() => uploadAndChangeVoice()}
                className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 p-px font-medium text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]"
              >
                <span className="relative flex items-center w-48 h-10 justify-center gap-2 rounded-xl bg-slate-950/50 px-4 py-2 transition-colors group-hover/btn:bg-transparent">
                  {loading ? (
                    <PulseLoader color="#fff" size={10} />
                  ) : (
                    <div className="flex items-center gap-2">
                      Generate Speech <SubmitIcon />
                    </div>
                  )}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
