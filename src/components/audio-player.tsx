"use client";

import { useState, useRef, useEffect } from "react";
import { AudioIcon, PauseIcon, PlayIcon } from "@/icons";

export default function AudioPlayer({
  file,
  isProcessed,
}: {
  file: File;
  isProcessed?: boolean;
}) {
  const { name, size, type } = file;
  const sizeInMB = (size / (1024 * 1024)).toFixed(2);
  const formattedType = type.split("/")[1];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false); // Track the playing state

  // Handle file change and reload the audio element
  useEffect(() => {
    // Revoke the previous URL (if any)
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    // Create a new object URL for the new file
    const newAudioUrl = URL.createObjectURL(file);
    setAudioUrl(newAudioUrl);

    // Reset progress and currentTime when the file changes
    setCurrentTime(0);
    setProgress(0);

    const audioElement = audioRef.current;

    if (audioElement) {
      // Update duration when audio metadata is loaded
      const handleLoadedMetadata = () => {
        setDuration(audioElement.duration);
      };

      // Update currentTime and progress on timeupdate event
      const handleTimeUpdate = () => {
        setCurrentTime(audioElement.currentTime);
        setProgress((audioElement.currentTime / audioElement.duration) * 100);
      };

      // Reset isPlaying to false when audio ends
      const handleEnded = () => {
        setIsPlaying(false); // Set isPlaying to false when the audio ends
      };

      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("ended", handleEnded); // Listen for 'ended' event

      // Cleanup event listeners when the file changes or component unmounts
      return () => {
        if (audioElement) {
          audioElement.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
          audioElement.removeEventListener("timeupdate", handleTimeUpdate);
          audioElement.removeEventListener("ended", handleEnded); // Remove 'ended' event listener
        }
      };
    }
  }, [file]); // Dependency on 'file' to trigger reloading when the file changes

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying); // Toggle the playing state
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <>
      {/* Hidden Audio Player */}
      <audio controls className="mt-4" ref={audioRef} src={audioUrl} hidden />

      {/* Visible Audio Player */}
      <div className="rounded-xl bg-slate-900/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-cyan-500/10 p-2">
              <AudioIcon />
            </div>
            <div>
              <p className="font-medium text-white">{name}</p>
              <p className="text-xs text-slate-400">
                {sizeInMB} MB •&nbsp;
                <span className="uppercase">{formattedType}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-cyan-500">
              {isProcessed ? "Processed" : "Original"}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <button
            className="text-slate-400 transition-colors hover:text-white mt-3"
            onClick={togglePlayPause}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          {/* Progress Bar */}
          <div className="mt-3 w-full h-1 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </div>
          </div>
        </div>

        {/* Current Time and Duration */}
        <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="mt-4 flex justify-end">
          {audioUrl && (
            <a
              href={audioUrl}
              download={name}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-2.5 py-1 text-white hover:bg-cyan-600 transition"
            >
              Download
            </a>
          )}
        </div>
      </div>
    </>
  );
}
