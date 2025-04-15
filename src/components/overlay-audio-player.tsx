"use client";

import { useRef, useState } from "react";
import { PlayIcon, PauseIcon } from "@/icons";

export default function OverlayAudioPlayer({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={url} />
      <button
        onClick={togglePlayPause}
        className="text-white hover:text-cyan-500"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </>
  );
}
