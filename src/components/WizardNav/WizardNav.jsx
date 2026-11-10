import Button from "../Button/Button.jsx";

export default function WizardNav({
  step,
  canContinue,
  onBack,
  onNext,
  onSubmit,
}) {
  return (
    <div className="nav">
      {step > 1 ? (
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
      ) : (
        <span />
      )}
      {step < 4 ? (
        <Button variant="primary" disabled={!canContinue} onClick={onNext}>
          Continue
        </Button>
      ) : (
        <Button variant="primary" onClick={onSubmit}>
          Submit request
        </Button>
      )}
    </div>
  );
}
