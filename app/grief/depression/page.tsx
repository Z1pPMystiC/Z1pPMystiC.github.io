import GriefStageCard from "../../components/GriefStageCard";

export default function DepressionPage() {
  return (
    <GriefStageCard
      message="Okay... I'll just cry myself to sleep tonight without you. I don't know why you flew out then."
      note="This is all a waste of time."
      continueHref="/grief/acceptance"
      continueLabel={"Keep rejecting \u2192"}
    />
  );
}
