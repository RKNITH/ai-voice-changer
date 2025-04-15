import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Voice } from "@/utils/types";
import OverlayAudioPlayer from "./overlay-audio-player";

export default function Voices({
  voiceId,
  setVoice,
  voicesData,
}: {
  voiceId: string;
  setVoice: Dispatch<SetStateAction<string>>;
  voicesData: Voice[];
}) {
  return (
    <div className="mt-6 h-[400px] overflow-y-auto scrollbar">
      <h1 className="hidden">Voice Styles available</h1>
      <div className="pt-1 flex flex-wrap justify-center gap-2">
        {voicesData.map((voice) => {
          const { voice_id, name, labels, preview_url } = voice;
          const { accent, age, description, gender, use_case } = labels;
          return (
            <div key={voice_id} className="relative">
              <div
                className=" relative cursor-pointer rounded-lg p-1 border border-transparent w-44 h-44 overflow-hidden"
                onClick={() => setVoice(voice_id)}
                style={{
                  border: `${voice_id === voiceId ? "1px solid white" : ""}`,
                }}
              >
                <Image
                  src={`/assets/images/${name.toLowerCase()}.png`}
                  alt=""
                  width={300}
                  height={300}
                  className="absolute w-full h-full object-cover top-0 left-0 right-0 bottom-0 rounded-lg "
                />
                <div className="absolute left-0 top-1/2 z-20">
                  <h1 className="bg-white/20 py-1 px-2  w-fit">{name}</h1>
                  <p className="bg-white/20 px-1 py-2 mt-1 text-xs capitalize">
                    {gender}, {accent}, {age},{description},{use_case}
                  </p>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <OverlayAudioPlayer url={preview_url} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
