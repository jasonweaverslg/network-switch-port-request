import { createContext, useContext, useReducer } from "react";
import { SITES } from "../data/mock.js";

const initial = {
  username: "",
  password: "",
  loginError: false,
  signedIn: false,
  siteId: null,
  deviceId: null,
  port: null,
  comment: "",
  siteQuery: "",
  deviceQuery: "",
  submitted: false,
};

const wizardBlank = {
  siteId: null,
  deviceId: null,
  port: null,
  comment: "",
  siteQuery: "",
  deviceQuery: "",
  submitted: false,
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
    case "siteQuery":
      return { ...s, siteQuery: a.v };
    case "deviceQuery":
      return { ...s, deviceQuery: a.v };
    case "pickSite":
      return { ...s, siteId: a.id, deviceId: null, port: null, comment: "", deviceQuery: "" };
    case "pickDevice":
      return { ...s, deviceId: a.id, port: null, comment: "" };
    case "pickPort":
      return { ...s, port: a.n };
    case "comment":
      return { ...s, comment: a.v };
    case "submit":
      return s.siteId && s.deviceId && s.port !== null ? { ...s, submitted: true } : s;
    case "another":
      return { ...s, ...wizardBlank };
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
    <AppContext.Provider value={{ state, dispatch, site, device }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  return useContext(AppContext);
}
