import { Navigate, useNavigate } from "react-router";
import { useApp } from "../state/AppContext.jsx";
import GradientTitle from "../components/GradientTitle/GradientTitle.jsx";
import SuccessIcon from "../components/SuccessIcon/SuccessIcon.jsx";
import SummaryCell from "../components/SummaryCell/SummaryCell.jsx";
import Button from "../components/Button/Button.jsx";

export default function SubmissionPage() {
  const { state, dispatch, site, device, signedIn } = useApp();
  const navigate = useNavigate();

  if (!signedIn) return <Navigate to="/login" replace />;
  if (!state.submitted || !site || !device) return <Navigate to="/" replace />;

  return (
    <main className="center-page">
      <div className="confirm">
        <div className="panel panel--done">
          <div className="confirm__head">
            <SuccessIcon />
            <GradientTitle size="md">Request submitted</GradientTitle>
            <div className="subtitle">
              Your switch port access request has been recorded.
            </div>
          </div>
          <div className="confirm__grid">
            <SummaryCell label="Site" value={site.name} />
            <SummaryCell label="Device" value={device.name} />
            <SummaryCell label="Floor" value={device.floor} />
            <SummaryCell label="Port" value={state.port} />
            <SummaryCell
              label="Purpose"
              value={state.comment.trim() || "No comment provided"}
              span2
            />
          </div>
          <div className="flex-row-wrap gap-8">
            <Button
              variant="primary"
              onClick={() => {
                dispatch({ type: "another" });
                navigate("/");
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
      </div>
    </main>
  );
}
