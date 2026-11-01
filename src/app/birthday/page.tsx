import { BirthdayRoom } from "@/components/birthday/BirthdayRoom";
import { ParticleCanvas } from "@/components/common/ParticleCanvas";

export const metadata = {
  title: "The Birthday Room | HER UNIVERSE",
  description: "The grand 19th birthday celebration for Akriti Singh.",
};

export default function BirthdayPage() {
  return (
    <>
      <ParticleCanvas />
      <div className="pt-20">
        <BirthdayRoom />
      </div>
    </>
  );
}
