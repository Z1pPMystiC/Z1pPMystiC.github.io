import GriefStageCard from "../../components/GriefStageCard";

export default function AcceptancePage() {
  return (
    <GriefStageCard
      title="Acceptance"
      message="Fine, I respect your decision. It doesn't make sense to me, but I'll let it go."
      note="No hard feelings. Just tasteful sadness."
      continueHref="/rejected"
      continueLabel={"Continue \u2192"}
    />
  );
}
