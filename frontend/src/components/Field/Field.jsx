export default function Field({ id, label, required, style, children }) {
  return (
    <div className="field" style={style}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required && (
          <>
            {" "}
            <span className="req">*</span>
          </>
        )}
      </label>
      {children}
    </div>
  );
}
