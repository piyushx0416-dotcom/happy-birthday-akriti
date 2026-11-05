"use client";

import React from "react";
import BirthdayUniverseExperience from "@/components/universe/BirthdayUniverseExperience";
import { useRouter } from "next/navigation";

export default function BirthdayUniversePage() {
  const router = useRouter();

  return (
    <main className="w-full h-screen bg-black overflow-hidden">
      <BirthdayUniverseExperience
        standalone={true}
      />
    </main>
  );
}
