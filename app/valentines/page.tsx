"use client";

import Link from "next/link";
import { useState } from "react";
import { ValentinesBackground } from "../components/ValentinesBackground";

const PINK_GRADIENT =
  "linear-gradient(135deg, #fff5f7 0%, #ffe4ec 50%, #ffd1dc 100%)";

type Phase = "closed" | "opening" | "open" | "done";

export default function ValentinesPage() {
  const [phase, setPhase] = useState<Phase>("closed");

  function handleHeartClick() {
    if (phase !== "closed") return;
    setPhase("opening");
    setTimeout(() => setPhase("done"), 5000);
  }

  // Only drop AFTER the flap is fully open
  const dropStyle =
  phase === "open"
    ? { animation: "envelopeDrop 20s cubic-bezier(0.25, 0.8, 0.25, 1) 0.05s forwards" }
    : {};

  return (
    <>
      <ValentinesBackground gradient={PINK_GRADIENT} />
      <div
        className="flex flex-col items-center justify-center p-6"
        style={{ minHeight: "100dvh" }}
      >
        <div className="relative max-w-lg w-full">
          {/* Envelope flap */}
          {phase !== "done" && (
            <div
              className="absolute"
              style={{
                top: 0,
                left: 0,
                right: 0,
                height: "55%",
                // Keep flap visible above the card/body while dropping
                zIndex: phase === "open" ? 5 : 15,
                ...dropStyle,
              }}
            >
              <button
                onClick={handleHeartClick}
                aria-label="Open envelope"
                className="focus:outline-none absolute inset-0"
                style={{
                  transformOrigin: "top center",
                  // Play the opening animation only during "opening"
                  animation:
                    phase === "opening"
                      ? "flapOpen 0.6s ease-in-out forwards"
                      : undefined,
                  // After animation ends, lock flap in fully-open pose
                  transform: phase === "open" ? "rotateX(180deg)" : undefined,
                  cursor: phase === "closed" ? "pointer" : "default",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
                onAnimationEnd={(e) => {
                  if (e.animationName === "flapOpen" && phase === "opening") {
                    setPhase("open");
                  }
                }}
              >
                {/* Triangle — base at top, tip pointing down */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#ecdcc8",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                />

                {/* Heart seal at triangle tip */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -14,
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    width: 32,
                    height: 30,
                    filter: "drop-shadow(0 2px 4px rgba(200,0,0,0.3))",
                  }}
                >
                  {/* Left half */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 16,
                      height: 26,
                      background: "#e84057",
                      borderRadius: "16px 16px 0 0",
                      transform: "rotate(45deg)",
                      transformOrigin: "100% 100%",
                    }}
                  />
                  {/* Right half */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 16,
                      width: 16,
                      height: 26,
                      background: "#e84057",
                      borderRadius: "16px 16px 0 0",
                      transform: "rotate(-45deg)",
                      transformOrigin: "0% 100%",
                    }}
                  />
                </div>
              </button>
            </div>
          )}

          {/* Question card */}
          <div
            className="w-[92%] mx-auto bg-white rounded-3xl shadow-xl px-6 py-6 sm:p-10 text-center"
            style={{ position: "relative", zIndex: 8 }}
          >
            <p className="text-pink-400 text-sm font-medium tracking-widest uppercase mb-2 sm:mb-4">
              A special question
            </p>
            <h1 className="text-2xl sm:text-3xl font-thin font-serif text-gray-800 mb-5 sm:mb-10 leading-relaxed">
              Emily, will you be my valentine?
            </h1>
            <div className="flex flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/puzzle"
                className="px-8 py-3 sm:py-4 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Yes
              </Link>
              <Link
                href="/rejected"
                className="px-8 py-3 sm:py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-2xl transition-all duration-300 hover:scale-105"
              >
                No
              </Link>
            </div>
          </div>

          {/* Envelope body — drops together with flap */}
          {phase !== "done" && (
            <div
              className="absolute inset-0 rounded-b-2xl"
              style={{
                backgroundColor: "#f5e6d3",
                border: "2px solid #e8d5c0",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                zIndex: 12,
                ...dropStyle,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}