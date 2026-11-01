import { InteractiveFairytale } from "@/components/fairytale/InteractiveFairytale";
import { ParticleCanvas } from "@/components/common/ParticleCanvas";

export const metadata = {
  title: "The Celestial Fairytale | HER UNIVERSE",
  description: "An interactive storybook in five chapters where Akriti is the protagonist.",
};

export default function FairytalePage() {
  return (
    <>
      <ParticleCanvas />
      <div className="pt-20">
        <InteractiveFairytale />
      </div>
    </>
  );
}
