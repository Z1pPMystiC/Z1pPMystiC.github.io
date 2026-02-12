import Link from "next/link";
import Image from "next/image";
import { ValentinesBackground } from "../components/ValentinesBackground";

const GRAY_GRADIENT = "linear-gradient(135deg, #f8f4f5 0%, #ede8ea 50%, #e5dfe2 100%)";

export default function RejectedPage() {
  return (
    <>
      <ValentinesBackground gradient={GRAY_GRADIENT} />
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 text-center">
          <Image
            src="/images/sadSloth.png"
            alt="Sad sloth"
            width={200}
            height={200}
            className="mx-auto mb-6 object-contain"
          />
          <h1 className="text-2xl sm:text-3xl font-thin font-serif text-gray-600 mb-6">
            Okay...
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6">
            I thought that spending 6-7 😂 years together would be enough to make you fall in love with me, but it seems like I was wrong.
            I'll have to wait 365 days to try again, and I'll be thinking of you every day until then.
          </p>
          <p className="text-gray-500 italic">
            Maybe next year? Unless you change your mind... 💙
          </p>
          <Link
            href="/valentines"
            className="inline-block mt-8 px-6 py-3 text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            ← Try again?
          </Link>
        </div>
      </div>
    </>
  );
}
