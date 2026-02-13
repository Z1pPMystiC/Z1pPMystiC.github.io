import Link from "next/link";
import Image from "next/image";
import { ValentinesBackground } from "../components/ValentinesBackground";

const GRAY_GRADIENT = "linear-gradient(135deg, #f8f4f5 0%, #ede8ea 50%, #e5dfe2 100%)";

export default function RejectedPage() {
  return (
    <>
      <ValentinesBackground gradient={GRAY_GRADIENT} />
      <div className="h-[100dvh] overflow-hidden flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-md min-h-[80dvh] max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-5 sm:p-8 text-center flex flex-col justify-evenly gap-4 sm:gap-5">
          <Image
            src="/images/sadSloth.png"
            alt="Sad sloth"
            width={200}
            height={200}
            className="mx-auto w-32 h-32 sm:w-44 sm:h-44 object-contain"
          />
          <h1 className="text-2xl sm:text-3xl font-thin font-serif text-gray-600">
            Okay...
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            I thought that spending 6-7 😂 years together would be enough to make you fall in love with me, but it seems like I was wrong.
            I&apos;ll always cherish our past Valentine&apos;s Day memories.
          </p>
          <p className="text-base sm:text-lg text-gray-500 italic">
            {"Maybe next year? \uD83D\uDC99"} <br /> 
            {"Unless you change your mind..."}
          </p>
          <Link
            href="/valentines"
            className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/60 hover:bg-white/75 text-gray-500 hover:text-gray-700 shadow-sm hover:shadow-md font-medium transition-all duration-200"
          >
            {"\u2190 Try again?"}
          </Link>
        </div>
      </div>
    </>
  );
}

