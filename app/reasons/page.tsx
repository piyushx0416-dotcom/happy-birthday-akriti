"use client";

import React from "react";
import Reasons365Section from "@/components/reasons/Reasons365Section";
import { useRouter } from "next/navigation";

export default function ReasonsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#08080D]">
      <Reasons365Section
        onNext={() => router.push("/game")}
      />
    </main>
  );
}
