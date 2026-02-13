import GriefStageCard from "../../components/GriefStageCard";

export default function DenialPage() {
  return (
    <GriefStageCard
      message="No? That must have been a misclick. We should probably double-check that answer."
      note="I am pretending this is a technical issue."
      continueHref="/grief/anger"
      continueLabel={"Keep rejecting \u2192"}
    />
  );
}
