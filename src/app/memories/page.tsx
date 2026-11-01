import { MemoriesSection } from "@/components/memories/MemoriesSection";
import { ParticleCanvas } from "@/components/common/ParticleCanvas";

export const metadata = {
  title: "Our Little Universe — Memories | HER UNIVERSE",
  description: "An interactive digital scrapbook and timeline celebrating Akriti Singh.",
};

export default function MemoriesPage() {
  return (
    <>
      <ParticleCanvas />
      <div className="pt-20">
        <MemoriesSection />
      </div>
    </>
  );
}
