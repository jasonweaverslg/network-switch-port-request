export default function Card({ done, title, children }) {
  return (
    <section className={"card" + (done ? " card--done" : "")}>
      {title && <div className="card-title">{title}</div>}
      {children}
    </section>
  );
}
