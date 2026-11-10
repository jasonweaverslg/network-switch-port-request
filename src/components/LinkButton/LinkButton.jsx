import "./LinkButton.css";

export default function LinkButton({ children, ...rest }) {
  return (
    <button type="button" className="link-btn" {...rest}>
      {children}
    </button>
  );
}
