import GriefStageCard from "../../components/GriefStageCard";

export default function DepressionPage() {
  return (
    <GriefStageCard
      message="This is the worst day of my life. I don't know why you flew out then."
      note="This is all a waste of time."
      continueHref="/grief/acceptance"
      continueLabel={"Keep rejecting \u2192"}
    />
  );
}
