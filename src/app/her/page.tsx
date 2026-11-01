import { MuseumOfHer } from "@/components/museum/MuseumOfHer";
import { ParticleCanvas } from "@/components/common/ParticleCanvas";

export const metadata = {
  title: "The Museum of Her | HER UNIVERSE",
  description: "A luxury virtual museum celebrating the beauty, mind, and soul of Akriti Singh.",
};

export default function MuseumPage() {
  return (
    <>
      <ParticleCanvas />
      <div className="pt-20">
        <MuseumOfHer />
      </div>
    </>
  );
}
