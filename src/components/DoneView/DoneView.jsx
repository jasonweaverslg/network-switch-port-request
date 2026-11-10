import { useNavigate } from "react-router";
import { useApp } from "../../state/AppContext.jsx";
import GradientTitle from "../GradientTitle/GradientTitle.jsx";
import Button from "../Button/Button.jsx";

export default function DoneView() {
  const { state, dispatch, site, device } = useApp();
  const navigate = useNavigate();
  if (!site || !device) return null;
  return (
    <div className="done">
      <div className="success-icon">
        <svg
          aria-hidden="true"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#166534"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12l5 5L20 7" />
        </svg>
      </div>
      <GradientTitle>Request submitted</GradientTitle>
      <div className="subtitle">
        Port {state.port} on {device.name} (Floor {device.floor}) at {site.name} has been requested.
      </div>
      <div className="flex-row-wrap gap-8">
        <Button
          variant="primary"
          onClick={() => {
            dispatch({ type: "another" });
            navigate("/site");
          }}
        >
          Submit another request
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            dispatch({ type: "signOut" });
            navigate("/login");
          }}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
