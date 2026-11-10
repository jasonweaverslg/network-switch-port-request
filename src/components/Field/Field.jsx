export default function Field({ id, label, required, children }) {
  return (
    <div className="field">
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
