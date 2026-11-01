import { ReasonsToSmile } from "@/components/reasons/ReasonsToSmile";
import { ParticleCanvas } from "@/components/common/ParticleCanvas";

export const metadata = {
  title: "365 Reasons to Smile | HER UNIVERSE",
  description: "A reason to smile for every single day of Akriti's 19th year.",
};

export default function ReasonsPage() {
  return (
    <>
      <ParticleCanvas />
      <div className="pt-20">
        <ReasonsToSmile />
      </div>
    </>
  );
}
