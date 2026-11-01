import { OpenWhenLetters } from "@/components/letters/OpenWhenLetters";
import { ParticleCanvas } from "@/components/common/ParticleCanvas";

export const metadata = {
  title: "Open When... | HER UNIVERSE",
  description: "Eight sealed interactive letters written from the heart for Akriti Singh.",
};

export default function LettersPage() {
  return (
    <>
      <ParticleCanvas />
      <div className="pt-20">
        <OpenWhenLetters />
      </div>
    </>
  );
}
