"use client";
import { useEffect } from "react";
import { usePlayer } from "./PlayerProvider";

// Landing sayfasında kendi Spotify embed'i var: iPod'dan çalan müziği durdur, sesler üst üste binmesin
export default function PauseOnMount() {
  const { pause } = usePlayer();
  useEffect(() => { pause(); }, [pause]);
  return null;
}
