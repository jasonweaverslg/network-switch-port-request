import { useApp } from "../state/AppContext.jsx";
import StepHead from "../components/StepHead/StepHead.jsx";
import ReviewCard from "../components/ReviewCard/ReviewCard.jsx";

export default function ReviewStep() {
  const { state, site, device } = useApp();
  return (
    <div className="step">
      <StepHead title="Review and submit" subtitle="Check the details below." />
      <ReviewCard
        site={site}
        device={device}
        port={state.port}
        comment={state.comment}
      />
    </div>
  );
}
