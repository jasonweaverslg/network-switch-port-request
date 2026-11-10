import { Link } from "react-router";
import StepHead from "./components/StepHead/StepHead.jsx";

/** Error page for when user tries to access a page that is not found */
export default function Error404() {
  return (
    <main className="stage">
      <div className="wizard">
        <StepHead title="404" subtitle="Page not found." />
        <div className="nav">
          <span />
          <Link className="btn btn--primary" to="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
            Back to start
          </Link>
        </div>
      </div>
    </main>
  );
}
