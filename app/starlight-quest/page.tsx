"use client";

import React from "react";
import StarlightQuest from "@/components/game/StarlightQuest";
import { useRouter } from "next/navigation";

export default function StarlightQuestAliasPage() {
  const router = useRouter();

  return (
    <main className="w-full min-h-screen bg-[#08020D]">
      <StarlightQuest
        standalone={true}
        onNext={() => router.push("/birthday-universe")}
      />
    </main>
  );
}
