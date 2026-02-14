import GriefStageCard from "../../components/GriefStageCard";

export default function AngerPage() {
  return (
    <GriefStageCard
      message="Unbelievable. I made this whole thing and you reject me. This is an outrage."
      note="You're messed up for that."
      continueHref="/grief/bargaining"
      continueLabel={"Keep rejecting \u2192"}
    />
  );
}
