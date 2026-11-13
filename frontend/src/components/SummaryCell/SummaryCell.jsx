export default function SummaryCell({ label, value, span2 }) {
  return (
    <div className={span2 ? "span-2" : ""}>
      <div className="summary-label">{label}</div>
      <div className="summary-value">{value}</div>
    </div>
  );
}
