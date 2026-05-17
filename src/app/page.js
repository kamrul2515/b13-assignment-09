import Bannar from "@/components/Bannar";
import BetterCare from "@/components/BetterCare";
import PatientsReview from "@/components/PatientsReview";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Bannar />
      <BetterCare />
      <PatientsReview />
    </div>
  );
}
