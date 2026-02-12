"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";

const EMPTY = 6;

const ADJACENT: Record<number, number[]> = {
  0: [1, 3],
  1: [0, 2, 4],
  2: [1, 5],
  3: [0, 4, 6],
  4: [1, 3, 5, 7],
  5: [2, 4, 8],
  6: [3, 7],
  7: [4, 6, 8],
  8: [5, 7],
};

const SOLVED = [0, 1, 2, 3, 4, 5, EMPTY, 7, 8];

function shuffleBoard(): number[] {
  const board = [...SOLVED];
  let emptyPos = 6;
  for (let i = 0; i < 80; i++) {
    const neighbors = ADJACENT[emptyPos];
    const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
    [board[emptyPos], board[randomNeighbor]] = [board[randomNeighbor], board[emptyPos]];
    emptyPos = randomNeighbor;
  }
  return board;
}

function isSolved(board: number[]): boolean {
  return board.every((val, i) => val === SOLVED[i]);
}

function getClientXY(e: React.PointerEvent | React.TouchEvent): { x: number; y: number } {
  if ("touches" in e && e.touches.length > 0) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  if ("changedTouches" in e && e.changedTouches.length > 0) {
    return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  }
  const pe = e as React.PointerEvent;
  return { x: pe.clientX, y: pe.clientY };
}

export default function SlidingPuzzle() {
  const [board, setBoard] = useState<number[]>(SOLVED);
  const [solved, setSolved] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [snapTarget, setSnapTarget] = useState<{ x: number; y: number } | null>(null);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);
  const dragEndProcessedRef = useRef(false);
  const dragInfoRef = useRef<{ axis: "h" | "v"; sign: 1 | -1; maxDist: number } | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const didDragRef = useRef(false);

  useEffect(() => {
    setBoard(shuffleBoard());
  }, []);

  const emptyIndex = board.indexOf(EMPTY);

  const handleMove = useCallback(
    (fromIndex: number) => {
      if (solved || !ADJACENT[emptyIndex].includes(fromIndex)) return;
      const newBoard = [...board];
      [newBoard[emptyIndex], newBoard[fromIndex]] = [
        newBoard[fromIndex],
        newBoard[emptyIndex],
      ];
      setBoard(newBoard);
      setSolved(isSolved(newBoard));
    },
    [board, emptyIndex, solved]
  );

  const getCellSize = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return { w: 100, h: 100, gap: 4 };
    const rect = grid.getBoundingClientRect();
    const gap = 4;
    const w = (rect.width - gap * 2) / 3;
    const h = (rect.height - gap * 2) / 3;
    return { w, h, gap };
  }, []);

  const handleDragStart = useCallback(
    (e: React.PointerEvent | React.TouchEvent, index: number) => {
      if (board[index] === EMPTY || solved) return;
      if (!ADJACENT[emptyIndex].includes(index)) return;
      e.preventDefault();
      dragEndProcessedRef.current = false;
      didDragRef.current = false;
      const { x, y } = getClientXY(e);

      const fromCol = index % 3;
      const fromRow = Math.floor(index / 3);
      const emptyCol = emptyIndex % 3;
      const emptyRow = Math.floor(emptyIndex / 3);
      const { w, h, gap } = getCellSize();

      if (fromRow === emptyRow) {
        dragInfoRef.current = { axis: "h", sign: emptyCol > fromCol ? 1 : -1, maxDist: w + gap };
      } else {
        dragInfoRef.current = { axis: "v", sign: emptyRow > fromRow ? 1 : -1, maxDist: h + gap };
      }

      setDraggingIndex(index);
      setDragOffset({ x: 0, y: 0 });
      dragOffsetRef.current = { x: 0, y: 0 };
      setSnapTarget(null);
      pointerStartRef.current = { x, y };
      if ("pointerId" in e) {
        (e.currentTarget as HTMLElement).setPointerCapture((e as React.PointerEvent).pointerId);
      }
    },
    [board, solved, emptyIndex, getCellSize]
  );

  const handleDragMove = useCallback(
    (e: React.PointerEvent | React.TouchEvent) => {
      if (draggingIndex === null || !dragInfoRef.current) return;
      e.preventDefault();
      const { x, y } = getClientXY(e);
      const rawX = x - pointerStartRef.current.x;
      const rawY = y - pointerStartRef.current.y;
      const { axis, sign, maxDist } = dragInfoRef.current;

      let cx = 0, cy = 0;
      if (axis === "h") {
        cx = sign > 0 ? Math.max(0, Math.min(rawX, maxDist)) : Math.max(-maxDist, Math.min(rawX, 0));
      } else {
        cy = sign > 0 ? Math.max(0, Math.min(rawY, maxDist)) : Math.max(-maxDist, Math.min(rawY, 0));
      }

      if (Math.abs(cx) > 3 || Math.abs(cy) > 3) didDragRef.current = true;

      dragOffsetRef.current = { x: cx, y: cy };
      setDragOffset({ x: cx, y: cy });
    },
    [draggingIndex]
  );

  const handleDragEnd = useCallback(
    () => {
      if (draggingIndex === null || dragEndProcessedRef.current || !dragInfoRef.current) return;
      dragEndProcessedRef.current = true;
      const fromIndex = draggingIndex;
      const { axis, sign, maxDist } = dragInfoRef.current;
      const offset = dragOffsetRef.current;

      // Treat as a click if no real drag occurred
      if (!didDragRef.current) {
        handleMove(fromIndex);
        setDraggingIndex(null);
        setSnapTarget(null);
        setDragOffset({ x: 0, y: 0 });
        dragEndProcessedRef.current = false;
        dragInfoRef.current = null;
        return;
      }

      const dragDist = axis === "h" ? offset.x * sign : offset.y * sign;
      const isValidDrop = dragDist > maxDist / 2;

      if (isValidDrop) {
        handleMove(fromIndex);
        setDraggingIndex(null);
        setSnapTarget(null);
        setDragOffset({ x: 0, y: 0 });
        dragEndProcessedRef.current = false;
        dragInfoRef.current = null;
      } else {
        setSnapTarget({ x: 0, y: 0 });
        setDragOffset({ x: 0, y: 0 });
        setTimeout(() => {
          setDraggingIndex(null);
          setSnapTarget(null);
          dragEndProcessedRef.current = false;
          dragInfoRef.current = null;
        }, 200);
      }
    },
    [draggingIndex, emptyIndex, handleMove]
  );

  useEffect(() => {
    const onPointerUp = () => {
      if (draggingIndex !== null && !dragEndProcessedRef.current) {
        setSnapTarget({ x: 0, y: 0 });
        setDragOffset({ x: 0, y: 0 });
        setDraggingIndex(null);
        setSnapTarget(null);
        dragInfoRef.current = null;
      }
    };
    window.addEventListener("pointerup", onPointerUp);
    return () => window.removeEventListener("pointerup", onPointerUp);
  }, [draggingIndex]);

  useEffect(() => {
    if (draggingIndex === null || !dragInfoRef.current) return;
    const info = dragInfoRef.current;
    const onMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const rawX = e.touches[0].clientX - pointerStartRef.current.x;
        const rawY = e.touches[0].clientY - pointerStartRef.current.y;

        let cx = 0, cy = 0;
        if (info.axis === "h") {
          cx = info.sign > 0 ? Math.max(0, Math.min(rawX, info.maxDist)) : Math.max(-info.maxDist, Math.min(rawX, 0));
        } else {
          cy = info.sign > 0 ? Math.max(0, Math.min(rawY, info.maxDist)) : Math.max(-info.maxDist, Math.min(rawY, 0));
        }

        dragOffsetRef.current = { x: cx, y: cy };
        setDragOffset({ x: cx, y: cy });
      }
    };
    document.addEventListener("touchmove", onMove, { passive: false });
    return () => document.removeEventListener("touchmove", onMove);
  }, [draggingIndex]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Link
        href="/valentines"
        className="self-start mb-4 px-6 py-3 text-rose-500 hover:text-rose-600 font-medium transition-colors"
      >
        ← Back
      </Link>
      <h1 className="text-2xl font-thin font-serif text-gray-800 mb-6">
        {solved ? "Look, it's us! How cute! ❤️" : "First, put the pieces together!"}
      </h1>
      <div
        className="relative w-[min(90vw,360px)] aspect-square rounded-xl shadow-lg overflow-hidden"
        style={{ maxWidth: 360, touchAction: "none" }}
      >
        <div
          ref={gridRef}
          className={`absolute inset-2 grid grid-cols-3 grid-rows-3 gap-1 bg-gray-200 transition-opacity duration-1000 ${
            solved ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{
            touchAction: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
        >
          {board.map((piece, index) => {
            const isAdjacent = ADJACENT[emptyIndex].includes(index);
            return (
            <div
              key={index}
              data-slot={index}
              onClick={() => !draggingIndex && handleMove(index)}
              onPointerDown={(e) => handleDragStart(e, index)}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
              onTouchStart={(e) => handleDragStart(e, index)}
              onTouchEnd={handleDragEnd}
              onTouchCancel={handleDragEnd}
              className={`aspect-square rounded-lg overflow-hidden select-none ${
                piece === EMPTY
                  ? ""
                  : isAdjacent
                    ? "cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-rose-400"
                    : ""
              }`}
              style={{
                WebkitTapHighlightColor: "transparent",
                touchAction: "none" as const,
                transform:
                  draggingIndex === index
                    ? `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`
                    : undefined,
                transition: snapTarget !== null ? "transform 0.2s ease-out" : "none",
                zIndex: draggingIndex === index ? 10 : 1,
              }}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(/images/emilyAndMisho.jpg)`,
                  backgroundSize: "300% 300%",
                  backgroundPosition: `${(piece % 3) * 50}% ${Math.floor(piece / 3) * 50}%`,
                  opacity: piece === EMPTY ? 0 : 1,
                }}
              />
            </div>
          );
          })}
        </div>
        <div
          className={`absolute inset-0 rounded-xl bg-cover bg-center transition-opacity duration-1000 ${
            solved ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            backgroundImage: `url(/images/emilyAndMisho.jpg)`,
          }}
        />
      </div>
      {solved && (
        <Link
          href="/accepted"
          className="mt-8 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Continue →
        </Link>
      )}
    </div>
  );
}
