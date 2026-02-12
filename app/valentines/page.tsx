import Link from "next/link";
import { ValentinesBackground } from "../components/ValentinesBackground";

const PINK_GRADIENT = "linear-gradient(135deg, #fff5f7 0%, #ffe4ec 50%, #ffd1dc 100%)";

export default function ValentinesPage() {
  return (
    <>
      <ValentinesBackground gradient={PINK_GRADIENT} />
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 text-center">
          <p className="text-pink-400 text-sm font-medium tracking-widest uppercase mb-4">
            A special question
          </p>
          <h1 className="text-2xl sm:text-3xl font-thin font-serif text-gray-800 mb-10 leading-relaxed">
            Emily, will you be my valentine?
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/puzzle"
              className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Yes
            </Link>
            <Link
              href="/rejected"
              className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-2xl transition-all duration-300 hover:scale-105"
            >
              No
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
