import GriefStageCard from "../../components/GriefStageCard";

export default function BargainingPage() {
  return (
    <GriefStageCard
      title="Bargaining"
      message="What if we call it a trial valentine? Just for today. Very low commitment."
      note="I can offer snacks and cuddle privileges."
      continueHref="/grief/depression"
      continueLabel={"Keep rejecting \u2192"}
    />
  );
}
