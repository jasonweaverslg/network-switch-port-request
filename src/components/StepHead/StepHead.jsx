import GradientTitle from "../GradientTitle/GradientTitle.jsx";

export default function StepHead({ title, subtitle }) {
  return (
    <div className="step-head">
      <GradientTitle>{title}</GradientTitle>
      <div className="subtitle">{subtitle}</div>
    </div>
  );
}
