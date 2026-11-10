import "./QuestionSection.css";

export default function QuestionSection({
  id,
  label,
  options,
  value,
  onChange,
}) {
  return (
    <section>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select your answer...</option>
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </section>
  );
}
