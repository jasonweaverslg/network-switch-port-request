import { Navigate, Route, Routes } from "react-router";
import Error404 from "./Error404.jsx";
import LoginScreen from "./Login/LoginScreen.jsx";
import WizardShell from "./WizardShell/WizardShell.jsx";
import SiteStep from "./steps/SiteStep.jsx";
import DeviceStep from "./steps/DeviceStep.jsx";
import PortStep from "./steps/PortStep.jsx";
import ReviewStep from "./steps/ReviewStep.jsx";
import DoneView from "./components/DoneView/DoneView.jsx";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<Navigate to="/site" replace />} />
        <Route element={<WizardShell />}>
          <Route path="/site" element={<SiteStep />} />
          <Route path="/device" element={<DeviceStep />} />
          <Route path="/port" element={<PortStep />} />
          <Route path="/review" element={<ReviewStep />} />
          <Route path="/done" element={<DoneView />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}
