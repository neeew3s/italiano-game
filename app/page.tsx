"use client";

import { useEffect } from "react";
import { trainerMarkup } from "@/lib/markup";
import { initTrainer } from "@/lib/trainer";

export default function HomePage() {
  useEffect(() => {
    initTrainer();
  }, []);

  return (
    <div
      className="bg-[#f8fafc] text-slate-800 min-h-screen flex flex-col antialiased"
      dangerouslySetInnerHTML={{ __html: trainerMarkup }}
    />
  );
}
