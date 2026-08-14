"use client";

import { useEffect, useRef } from "react";

/**
 * The hero footage. Muted+playsInline satisfies autoplay policy; the effect
 * retries play() when the tab becomes visible, because hidden renderers
 * suspend video and some browsers don't resume on their own.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const kick = () => { v.play().catch(() => {}); };
    kick();
    document.addEventListener("visibilitychange", kick);
    return () => document.removeEventListener("visibilitychange", kick);
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      poster="/hero-bg-poster.jpg"
      src="/hero-bg.mp4"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
