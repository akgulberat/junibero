"use client";
import { useEffect, useState } from "react";
import MiniPlayer from "./MiniPlayer";

export default function HomeMiniPlayer() {
  const [ipodVisible, setIpodVisible] = useState(true);
  useEffect(() => {
    const el = document.getElementById("home");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setIpodVisible(e.intersectionRatio > 0.4), { threshold: [0, 0.4, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <MiniPlayer hidden={ipodVisible} />;
}
