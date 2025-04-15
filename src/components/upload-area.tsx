import { Dispatch, FC, SetStateAction } from "react";
import RecordButton from "./record-btn";

interface Props {
  setProcessedFile: Dispatch<SetStateAction<File | null>>;
  setVoice: Dispatch<SetStateAction<string>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  setShowRecordingArea: Dispatch<SetStateAction<boolean>>;
}

const UploadArea: FC<Props> = ({
  setProcessedFile,
  setFile,
  setVoice,
  setShowRecordingArea,
}) => {
  return (
    <div>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => {
          setProcessedFile(null);
          setVoice("");
          setFile(e.target.files?.[0] || null);
        }}
        className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
      />
      <div className=" space-y-6 text-center pb-16">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-900">
          <svg
            className="h-10 w-10 text-cyan-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <p className="text-base font-medium text-white">
            Drop your files here or browse
          </p>
          <p className="text-sm text-slate-400">
            Supported audio files include MP3, WAV, OGG, FLAC, M4A, AAC, WMA,
            and AIFF.
          </p>
          <p className="text-xs text-slate-400">Max file size: 50MB</p>
        </div>
        <div className="inline-flex items-center text-xs px-2.5 h-6 rounded-full font-medium transition-colors whitespace-nowrap focus-ring border border-transparent bg-gray-700 text-dark my-2.5">
          or
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 z-50">
          <div onClick={() => setShowRecordingArea(true)}>
            <RecordButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadArea;
