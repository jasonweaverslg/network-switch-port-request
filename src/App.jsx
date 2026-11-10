import { Route, Routes, Link } from "react-router";
import Error404 from "./Error404.jsx";
import RequestForm from "./RequestForm/RequestForm.jsx";
import SubmissionPage from "./RequestForm/SubmissionPage.jsx";

export default function App() {
  return (
    <>
      <h1>
        <Link to="/">Switch Port Requests</Link>
      </h1>
      <Routes>
        <Route path="/" element={<RequestForm />} />
        <Route path="/submitted" element={<SubmissionPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}
