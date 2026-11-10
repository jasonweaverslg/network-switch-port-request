import { useApp } from "../state/AppContext.jsx";
import StepHead from "../components/StepHead/StepHead.jsx";
import Field from "../components/Field/Field.jsx";
import TextInput from "../components/Field/TextInput.jsx";
import OptionList from "../components/OptionList/OptionList.jsx";

export default function DeviceStep() {
  const { state, dispatch, site } = useApp();
  const q = state.deviceQuery.trim().toLowerCase();
  const items = site.devices.filter(
    (x) => !q || (x.name + " " + x.floor).toLowerCase().includes(q),
  );
  return (
    <div className="step">
      <StepHead title="Which device?" subtitle={`Network devices at ${site.name}.`} />
      <Field id="dq" label="Search devices">
        <TextInput
          id="dq"
          type="text"
          autoComplete="off"
          placeholder="Type a device name or floor"
          value={state.deviceQuery}
          onChange={(e) => dispatch({ type: "deviceQuery", v: e.target.value })}
        />
      </Field>
      <OptionList
        idPrefix="opt-dev"
        items={items}
        selectedId={state.deviceId}
        emptyText="No matching devices"
        onSelect={(id) => dispatch({ type: "pickDevice", id })}
        renderContent={(d) => (
          <>
            <span className="opt__name opt__name--grow">{d.name}</span>
            <span className="badge-floor">Floor {d.floor}</span>
          </>
        )}
      />
    </div>
  );
}
