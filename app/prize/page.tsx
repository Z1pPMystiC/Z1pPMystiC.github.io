"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { ValentinesBackground } from "../components/ValentinesBackground";

const PINK_GRADIENT =
  "linear-gradient(135deg, #fff5f7 0%, #ffe4ec 50%, #ffd1dc 100%)";

const PRIZES = [
  "A homemade steak dinner",
  "Bubble bath for two",
  "Thai dinner night out",
  "Mall shopping trip",
  "PJ movie night with snacks",
  "Lots of cuddles and kisses",
];

function getRandomPrize() {
  return PRIZES[Math.floor(Math.random() * PRIZES.length)];
}

export default function PrizePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [prize, setPrize] = useState("");
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    setPrize(getRandomPrize());
  }, []);

  const checkRevealProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    const total = pixels.length / 4;
    if (transparent / total > 0.5) {
      setRevealed(true);
    }
  }, [revealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill with scratch-off coating
    ctx.fillStyle = "#b0b0b0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add shimmer pattern
    ctx.fillStyle = "#a0a0a0";
    for (let x = 0; x < canvas.width; x += 6) {
      for (let y = 0; y < canvas.height; y += 6) {
        if ((x + y) % 12 === 0) {
          ctx.fillRect(x, y, 3, 3);
        }
      }
    }

    // Add "Scratch here!" text
    ctx.fillStyle = "#888";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch here!", canvas.width / 2, canvas.height / 2);
  }, []);

  const scratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();
    },
    []
  );

  const getPos = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e) {
        const touch = e.touches[0];
        return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
      }
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    },
    []
  );

  const handleStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      isDrawing.current = true;
      const pos = getPos(e);
      if (pos) scratch(pos.x, pos.y);
    },
    [getPos, scratch]
  );

  const handleMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (!isDrawing.current) return;
      const pos = getPos(e);
      if (pos) scratch(pos.x, pos.y);
    },
    [getPos, scratch]
  );

  const handleEnd = useCallback(() => {
    isDrawing.current = false;
    checkRevealProgress();
  }, [checkRevealProgress]);

  return (
    <>
      <ValentinesBackground gradient={PINK_GRADIENT} />
      <div className="h-[100dvh] overflow-hidden flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-5 sm:p-8 text-center flex flex-col items-center gap-5 sm:gap-6">
          <h1 className="text-2xl sm:text-3xl font-thin font-serif text-rose-600">
            Your Prize!
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Scratch the card below to reveal your prize
          </p>

          {/* Scratch-off card */}
          <div
            ref={containerRef}
            className="relative w-full rounded-2xl overflow-hidden shadow-inner select-none"
            style={{ height: 160, touchAction: "none" }}
          >
            {/* Prize text underneath */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-200 px-4">
              <p className="text-xl sm:text-xl font-semibold text-rose-700 text-center leading-snug">
                {prize}
              </p>
            </div>

            {/* Scratch canvas overlay */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full rounded-2xl transition-opacity duration-700 ${
                revealed ? "opacity-0 pointer-events-none" : "cursor-pointer"
              }`}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
            />
          </div>

          <Link
            href="/accepted"
            className="w-full inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/60 hover:bg-white/75 text-rose-500 hover:text-rose-600 shadow-sm hover:shadow-md font-medium transition-all duration-200"
          >
            {"\u2190 Back"}
          </Link>
        </div>
      </div>
    </>
  );
}
