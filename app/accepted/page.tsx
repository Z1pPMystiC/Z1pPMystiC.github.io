import Link from "next/link";
import Image from "next/image";
import { ValentinesBackground } from "../components/ValentinesBackground";

const PINK_GRADIENT = "linear-gradient(135deg, #fff5f7 0%, #ffe4ec 50%, #ffd1dc 100%)";

export default function AcceptedPage() {
  return (
    <>
      <ValentinesBackground gradient={PINK_GRADIENT} />
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 text-center">
          <Image
            src="/images/happySloth.png"
            alt="Happy sloth"
            width={200}
            height={200}
            className="mx-auto mb-6 object-contain"
          />
          <h1 className="text-2xl sm:text-3xl font-thin font-serif text-rose-600 mb-6">
            You said yes!
          </h1>
          <p className="text-gray-700 leading-relaxed mb-6">
            Emily, I'm so grateful to have you as my valentine. These past 6-7 😂 years have been amazing, 
            and I'm looking forward to spending many more with you! I love you more than words can say.
          </p>
          <p className="text-gray-600 italic">
            Happy Valentine&apos;s Day! 💝
          </p>
          <Link
            href="/valentines"
            className="inline-block mt-8 px-6 py-3 text-rose-500 hover:text-rose-600 font-medium transition-colors"
          >
            ← Back
          </Link>
        </div>
      </div>
    </>
  );
}
