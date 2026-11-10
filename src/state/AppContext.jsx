import { createContext, useContext, useReducer } from "react";
import { SITES } from "../data/mock.js";

const blankForm = { siteId: null, deviceId: null, port: null, comment: "" };
const initial = {
  username: "",
  password: "",
  loginError: false,
  signedIn: false,
  submitted: false,
  ...blankForm,
};

function reducer(s, a) {
  switch (a.type) {
    case "setUsername":
      return { ...s, username: a.v, loginError: false };
    case "setPassword":
      return { ...s, password: a.v, loginError: false };
    case "signIn":
      return s.username.trim() && s.password
        ? { ...s, signedIn: true, password: "", loginError: false }
        : { ...s, loginError: true };
    case "signOut":
      return { ...initial };
    case "pickSite":
      return { ...s, siteId: a.id, deviceId: null, port: null, comment: "" };
    case "pickDevice":
      return { ...s, deviceId: a.id, port: null, comment: "" };
    case "pickPort":
      return { ...s, port: a.n };
    case "setComment":
      return { ...s, comment: a.v };
    case "resetForm":
      return { ...s, ...blankForm };
    case "submit":
      return s.siteId && s.deviceId && s.port !== null
        ? { ...s, submitted: true }
        : s;
    case "another":
      return { ...s, ...blankForm, submitted: false };
    default:
      return s;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const site = SITES.find((x) => x.id === state.siteId) || null;
  const device = site ? site.devices.find((x) => x.id === state.deviceId) || null : null;
  return (
    <AppContext.Provider value={{ state, dispatch, site, device, signedIn: state.signedIn }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  return useContext(AppContext);
}
