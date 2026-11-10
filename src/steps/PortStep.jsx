import { useApp } from "../state/AppContext.jsx";
import StepHead from "../components/StepHead/StepHead.jsx";
import Field from "../components/Field/Field.jsx";
import TextArea from "../components/Field/TextArea.jsx";
import PortGrid from "../components/PortGrid/PortGrid.jsx";

export default function PortStep() {
  const { state, dispatch, device } = useApp();
  return (
    <div className="step">
      <StepHead
        title="Which port?"
        subtitle={`Port on ${device.name}. Choose one.`}
      />
      <PortGrid
        selected={state.port}
        onSelect={(n) => dispatch({ type: "pickPort", n })}
      />
      {state.port !== null && (
        <Field id="cmt" label={`What is port ${state.port} for? (optional)`}>
          <TextArea
            id="cmt"
            placeholder="e.g. Security camera"
            value={state.comment}
            onChange={(e) => dispatch({ type: "comment", v: e.target.value })}
          />
        </Field>
      )}
    </div>
  );
}
