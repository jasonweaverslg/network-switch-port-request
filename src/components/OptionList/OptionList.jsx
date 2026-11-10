export default function OptionList({
  items,
  selectedId,
  emptyText,
  onSelect,
  renderContent,
  idPrefix,
}) {
  return (
    <div className="options">
      {items.map((i) => {
        const sel = i.id === selectedId;
        return (
          <button
            key={i.id}
            type="button"
            id={`${idPrefix}-${i.id}`}
            className={"opt" + (sel ? " opt--selected" : "")}
            aria-pressed={sel}
            onClick={() => onSelect(i.id)}
          >
            <span className="opt__dot" />
            {renderContent(i)}
          </button>
        );
      })}
      {items.length === 0 && <div className="options__empty">{emptyText}</div>}
    </div>
  );
}
