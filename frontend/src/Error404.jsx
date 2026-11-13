import { Link } from "react-router";

/** Error page for when user tries to access a page that is not found */
export default function Error404() {
  return (
    <main className="center-page">
      <div className="login">
        <h1 className="gradient-title gradient-title--md">404</h1>
        <div className="subtitle">Page not found.</div>
        <Link className="link-btn" to="/">
          Back to request form
        </Link>
      </div>
    </main>
  );
}
