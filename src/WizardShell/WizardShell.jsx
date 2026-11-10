import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { useApp } from "../state/AppContext.jsx";
import "./WizardShell.css";
import LinkButton from "../components/LinkButton/LinkButton.jsx";
import Eyebrow from "../components/Eyebrow/Eyebrow.jsx";
import ProgressBar from "../components/ProgressBar/ProgressBar.jsx";
import WizardNav from "../components/WizardNav/WizardNav.jsx";

const STEP_PATHS = ["/site", "/device", "/port", "/review"];

export default function WizardShell() {
  const { state, dispatch, site, device } = useApp();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function signOut() {
    dispatch({ type: "signOut" });
    navigate("/login");
  }

  if (!state.signedIn) return <Navigate to="/login" replace />;

  const done = pathname === "/done";
  const step = STEP_PATHS.indexOf(pathname) + 1; // 1..4, 0 on /done

  // Redirect to the earliest valid step if a prior choice is missing.
  if (done && !state.submitted) return <Navigate to="/review" replace />;
  if (!done) {
    if (step >= 2 && !site) return <Navigate to="/site" replace />;
    if (step >= 3 && !device) return <Navigate to="/device" replace />;
    if (step >= 4 && state.port === null)
      return <Navigate to="/port" replace />;
    if (state.submitted) return <Navigate to="/done" replace />;
  }

  const canContinue =
    step === 1
      ? site !== null
      : step === 2
        ? device !== null
        : step === 3
          ? state.port !== null
          : true;

  return (
    <>
      <header className="topbar">
        <Eyebrow>SL Green · Network Access</Eyebrow>
        <div className="topbar__right">
          <span>Switch port request</span>
          <LinkButton onClick={signOut}>Sign out</LinkButton>
        </div>
      </header>
      <main className="stage">
        <div className="wizard">
          {done ? (
            <Outlet />
          ) : (
            <>
              <ProgressBar step={step} />
              <Outlet />
              <WizardNav
                step={step}
                canContinue={canContinue}
                onBack={() => navigate(STEP_PATHS[step - 2])}
                onNext={() => canContinue && navigate(STEP_PATHS[step])}
                onSubmit={() => {
                  dispatch({ type: "submit" });
                  navigate("/done");
                }}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}
