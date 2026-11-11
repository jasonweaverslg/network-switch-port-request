const PORTS = Array.from({ length: 40 }, (_, i) => i + 1);

export default function PortGrid({ selected, onSelect }) {
  return (
    <div className="port-grid">
      {PORTS.map((n) => {
        const sel = selected === n;
        return (
          <button
            key={n}
            type="button"
            id={`port-${n}`}
            className={"port" + (sel ? " port--selected" : "")}
            aria-pressed={sel}
            aria-label={`Port ${n}`}
            onClick={() => onSelect(n)}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
