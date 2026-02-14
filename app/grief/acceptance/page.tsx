import GriefStageCard from "../../components/GriefStageCard";

export default function AcceptancePage() {
  return (
    <GriefStageCard
      message="Fine, I respect your decision. It doesn't make sense to me, but I'll let it go."
      note="No hard feelings... I guess..."
      continueHref="/rejected"
      continueLabel={"Continue \u2192"}
    />
  );
}
