export default function GradientTitle({ size, children }) {
  return <h1 className={`gradient-title gradient-title--${size}`}>{children}</h1>;
}
