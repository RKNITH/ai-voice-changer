import MicrophoneIcon from "@/icons/mic";

export default function RecordButton() {
  return (
    <button className="relative inline-flex items-center gap-2 px-6 py-3 font-semibold text-teal-50 bg-gradient-to-tr from-teal-900/30 via-teal-900/70 to-teal-900/30 ring-4 ring-teal-900/20 rounded-full overflow-hidden hover:opacity-90 transition-opacity before:absolute before:top-4 before:left-1/2 before:-translate-x-1/2 before:w-[100px] before:h-[100px] before:rounded-full before:bg-gradient-to-b before:from-teal-50/10 before:blur-xl">
      <MicrophoneIcon /> Record Audio
    </button>
  );
}
