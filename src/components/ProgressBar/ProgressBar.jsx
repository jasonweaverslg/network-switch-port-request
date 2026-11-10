const LABELS = ["Site", "Device", "Port", "Review"];

export default function ProgressBar({ step }) {
  return (
    <div className="progress">
      <div className="progress__bars">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={"progress__bar" + (i <= step ? " progress__bar--on" : "")}
          />
        ))}
      </div>
      <div className="progress__caption">
        Step {step} of 4 · {LABELS[step - 1]}
      </div>
    </div>
  );
}
