import GriefStageCard from "../../components/GriefStageCard";

export default function AngerPage() {
  return (
    <GriefStageCard
      title="Anger"
      message="Unbelievable. I made this whole thing and you reject me. This is an outrage."
      note="I am filing an emotional complaint."
      continueHref="/grief/bargaining"
      continueLabel={"Keep rejecting \u2192"}
    />
  );
}
