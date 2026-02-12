"use client";

import { useEffect } from "react";

export function ValentinesBackground({
  gradient,
}: {
  gradient: string;
}) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlBg = html.style.background;
    const prevBodyBg = body.style.background;

    html.style.background = "white";
    body.style.background = "transparent";

    return () => {
      html.style.background = prevHtmlBg;
      body.style.background = prevBodyBg;
    };
  }, [gradient]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        background: gradient,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, white 0%, transparent 8%, transparent 92%, white 100%)",
        }}
      />
    </div>
  );
}
