import Link from "next/link";
import Image from "next/image";
import { ValentinesBackground } from "../components/ValentinesBackground";

const PINK_GRADIENT = "linear-gradient(135deg, #fff5f7 0%, #ffe4ec 50%, #ffd1dc 100%)";

export default function AcceptedPage() {
  return (
    <>
      <ValentinesBackground gradient={PINK_GRADIENT} />
      <div className="h-[100dvh] overflow-hidden flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-md min-h-[80dvh] max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-5 sm:p-8 text-center flex flex-col justify-evenly gap-4 sm:gap-5">
          <Image
            src="/images/happySloth.png"
            alt="Happy sloth"
            width={200}
            height={200}
            className="mx-auto w-32 h-32 sm:w-44 sm:h-44 object-contain"
          />
          <h1 className="text-2xl sm:text-3xl font-thin font-serif text-rose-600">
            You said yes!
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Emily, I&apos;m so grateful to have you as my valentine. These past 6-7 😂 years have been amazing,
            and I&apos;m looking forward to spending many more with you! I love you more than words can say.
          </p>
          <p className="text-base sm:text-lg text-gray-600 italic">
            {"Happy Valentine\u2019s Day! \uD83D\uDC9D"}
          </p>
          <div className="flex gap-3 w-full">
            <Link
              href="/valentines"
              className="inline-flex items-center justify-center w-1/3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-full bg-white/60 hover:bg-white/75 text-rose-500 hover:text-rose-600 shadow-sm hover:shadow-md font-medium transition-all duration-200 text-sm sm:text-base"
            >
              {"\u2190 Back"}
            </Link>
            <Link
              href="/prize"
              className="inline-flex items-center justify-center w-2/3 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-xl font-medium transition-all duration-200 hover:scale-105 text-sm sm:text-base"
            >
              {"Claim your prize \uD83C\uDF81"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
