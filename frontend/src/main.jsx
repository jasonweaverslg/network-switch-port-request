import { createRoot } from "react-dom/client";
import "./styles/styles.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AppProvider } from "./state/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>,
);
