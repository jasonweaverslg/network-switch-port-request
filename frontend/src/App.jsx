import { Route, Routes } from "react-router";
import Error404 from "./Error404.jsx";
import LoginScreen from "./Login/LoginScreen.jsx";
import RequestForm from "./RequestForm/RequestForm.jsx";
import SubmissionPage from "./RequestForm/SubmissionPage.jsx";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<RequestForm />} />
        <Route path="/submitted" element={<SubmissionPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}
