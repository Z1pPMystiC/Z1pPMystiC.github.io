import Image from "next/image";
import Link from "next/link";
import { ValentinesBackground } from "./ValentinesBackground";

const GRAY_GRADIENT = "linear-gradient(135deg, #f8f4f5 0%, #ede8ea 50%, #e5dfe2 100%)";

type GriefStageCardProps = {
  title: string;
  message: string;
  note: string;
  continueHref: string;
  continueLabel: string;
};

export default function GriefStageCard({
  title,
  message,
  note,
  continueHref,
  continueLabel,
}: GriefStageCardProps) {
  return (
    <>
      <ValentinesBackground gradient={GRAY_GRADIENT} />
      <div className="h-[100dvh] overflow-hidden flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-md min-h-[40dvh] max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-5 sm:p-7 text-center flex flex-col justify-evenly gap-3 sm:gap-4">
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {message}
          </p>
          <p className="text-base sm:text-lg text-gray-500 italic">
            {note}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/valentines"
              className="inline-flex w-full items-center justify-center px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/60 hover:bg-white/75 text-gray-500 hover:text-gray-700 shadow-sm hover:shadow-md font-medium transition-all duration-200"
            >
              {"\u2190 Go back"}
            </Link>
            <Link
              href={continueHref}
              className="inline-flex w-full items-center justify-center px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 shadow-sm hover:shadow-md font-medium transition-all duration-200"
            >
              {continueLabel}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
