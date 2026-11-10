import { useState } from "react";

export default function SearchableSelect({
  id,
  placeholder,
  items,
  selected,
  emptyText,
  getKey,
  getSearchText,
  getInputLabel,
  renderItem,
  onSelect,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = items.filter((i) => !q || getSearchText(i).toLowerCase().includes(q));
  const value = open ? query : selected ? getInputLabel(selected) : "";
  return (
    <div className="sd">
      <input
        id={id}
        className="fc"
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onFocus={() => {
          setOpen(true);
          setQuery("");
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onBlur={() => {
          setOpen(false);
          setQuery("");
        }}
      />
      <svg
        className="sd__chevron"
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6b7280"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
      {open && (
        <div className="sd__list">
          {shown.map((i) => (
            <button
              key={getKey(i)}
              type="button"
              className="sd__item"
              onMouseDown={() => {
                onSelect(i);
                setOpen(false);
                setQuery("");
              }}
            >
              {renderItem(i)}
            </button>
          ))}
          {shown.length === 0 && <div className="sd__empty">{emptyText}</div>}
        </div>
      )}
    </div>
  );
}
