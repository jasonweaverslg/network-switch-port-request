import { useEffect, useRef, useState } from "react";

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
  matches,
}) {
  // State set ups
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const activeRef = useRef(null);

  // Selected and filtered dropdown items
  const q = query.trim().toLowerCase();
  const shown = items.filter(
    (i) =>
      !q ||
      (matches ? matches(i, q) : getSearchText(i).toLowerCase().includes(q)),
  );
  const value = open ? query : selected != null ? getInputLabel(selected) : "";
  const activeIdx = Math.min(active, Math.max(shown.length - 1, 0));

  // Keep the highlighted row visible when navigating a long list
  useEffect(() => {
    if (open) activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeIdx, open]);

  // Keyboard Handler (Arrow Keys and Enter/Esc behavior)
  function onKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setQuery("");
        setActive(0);
        return;
      }
      setActive(Math.min(activeIdx + 1, shown.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(Math.max(activeIdx - 1, 0));
    } else if (e.key === "Enter" && open && shown[activeIdx] !== undefined) {
      e.preventDefault();
      choose(shown[activeIdx]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setQuery("");
    }
  }

  // Select an active dropdown element
  function choose(i) {
    onSelect(i);
    setOpen(false);
    setQuery("");
  }

  // Dropdown Render
  const listId = id + "-list";
  return (
    <div className="sd">
      <input
        id={id}
        className="fc"
        type="text"
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          open && shown.length > 0 ? `${id}-opt-${activeIdx}` : undefined
        }
        placeholder={placeholder}
        value={value}
        onKeyDown={onKeyDown}
        onFocus={() => {
          setOpen(true);
          setQuery("");
          setActive(0);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(0);
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
        <div className="sd__list" id={listId} role="listbox">
          {shown.map((i, idx) => (
            <button
              key={getKey(i)}
              id={`${id}-opt-${idx}`}
              ref={idx === activeIdx ? activeRef : null}
              type="button"
              role="option"
              tabIndex={-1}
              aria-selected={idx === activeIdx}
              className={
                "sd__item" + (idx === activeIdx ? " sd__item--active" : "")
              }
              onMouseEnter={() => setActive(idx)}
              onMouseDown={() => choose(i)}
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
