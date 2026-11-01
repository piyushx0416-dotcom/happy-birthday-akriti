import { HeroSection } from "@/components/hero/HeroSection";
import { ParticleCanvas } from "@/components/common/ParticleCanvas";

export const metadata = {
  title: "The Main Character | HER UNIVERSE",
  description: "A 3D cinematic fantasy character experience dedicated to Akriti Singh.",
};

export default function UniversePage() {
  return (
    <>
      <ParticleCanvas />
      <div className="pt-8">
        <HeroSection />
      </div>
    </>
  );
}
