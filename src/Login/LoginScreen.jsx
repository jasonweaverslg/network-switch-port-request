import "./Login.css";
import { Navigate, useNavigate } from "react-router";
import { useApp } from "../state/AppContext.jsx";
import Eyebrow from "../components/Eyebrow/Eyebrow.jsx";
import GradientTitle from "../components/GradientTitle/GradientTitle.jsx";
import Field from "../components/Field/Field.jsx";
import TextInput from "../components/Field/TextInput.jsx";
import Button from "../components/Button/Button.jsx";

export default function LoginScreen() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  if (state.signedIn) return <Navigate to="/site" replace />;

  function onSubmit(e) {
    e.preventDefault();
    dispatch({ type: "signIn" });
    if (state.username.trim() && state.password) navigate("/site");
  }

  return (
    <main className="login-page">
      <div className="login">
        <div className="login__head">
          <Eyebrow>SL Green Realty Corp — Business Applications</Eyebrow>
          <GradientTitle>Network Access Requests</GradientTitle>
          <div className="subtitle">Sign in to request access to a switch port.</div>
        </div>
        <form className="panel" noValidate onSubmit={onSubmit}>
          <Field id="user" label="Email or username" required>
            <TextInput
              id="user"
              type="text"
              placeholder="name@company.com"
              autoComplete="username"
              value={state.username}
              onChange={(e) => dispatch({ type: "setUsername", v: e.target.value })}
            />
          </Field>
          <Field id="pass" label="Password" required>
            <TextInput
              id="pass"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={state.password}
              onChange={(e) => dispatch({ type: "setPassword", v: e.target.value })}
            />
          </Field>
          {state.loginError && (
            <div className="alert-error" role="alert">
              Enter your email or username and password to continue.
            </div>
          )}
          <Button variant="primary" block type="submit">
            Sign in
          </Button>
        </form>
      </div>
    </main>
  );
}
