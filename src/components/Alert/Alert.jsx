export default function Alert({ children }) {
  return (
    <div className="alert-error" role="alert">
      {children}
    </div>
  );
}
