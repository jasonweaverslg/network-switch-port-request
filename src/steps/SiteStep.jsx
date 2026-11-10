import { useApp } from "../state/AppContext.jsx";
import { SITES } from "../data/mock.js";
import StepHead from "../components/StepHead/StepHead.jsx";
import Field from "../components/Field/Field.jsx";
import TextInput from "../components/Field/TextInput.jsx";
import OptionList from "../components/OptionList/OptionList.jsx";

export default function SiteStep() {
  const { state, dispatch } = useApp();
  const q = state.siteQuery.trim().toLowerCase();
  const items = SITES.filter((x) => !q || x.name.toLowerCase().includes(q));
  return (
    <div className="step">
      <StepHead
        title="Which site?"
        subtitle="Select the building location that has the switch."
      />
      <Field id="sq" label="Search sites">
        <TextInput
          id="sq"
          type="text"
          autoComplete="off"
          placeholder="Type to filter"
          value={state.siteQuery}
          onChange={(e) => dispatch({ type: "siteQuery", v: e.target.value })}
        />
      </Field>
      <OptionList
        idPrefix="opt-site"
        items={items}
        selectedId={state.siteId}
        emptyText="No matching sites"
        onSelect={(id) => dispatch({ type: "pickSite", id })}
        renderContent={(s) => <span className="opt__name">{s.name}</span>}
      />
    </div>
  );
}
