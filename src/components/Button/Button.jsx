export default function Button({
  variant,
  block,
  type = "button",
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}${block ? " btn--block" : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
