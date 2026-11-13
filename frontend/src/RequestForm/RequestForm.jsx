import "./RequestForm.css";
import { Navigate, useNavigate } from "react-router";
import { useApp } from "../state/AppContext.jsx";
import { SITES, TECHGROUPS } from "../data/mock.js";
import Eyebrow from "../components/Eyebrow/Eyebrow.jsx";
import GradientTitle from "../components/GradientTitle/GradientTitle.jsx";
import LinkButton from "../components/LinkButton/LinkButton.jsx";
import Card from "../components/Card/Card.jsx";
import Field from "../components/Field/Field.jsx";
import TextArea from "../components/Field/TextArea.jsx";
import SearchableSelect from "../components/SearchableSelect/SearchableSelect.jsx";
import PortGrid from "../components/PortGrid/PortGrid.jsx";
import Button from "../components/Button/Button.jsx";

export default function RequestForm() {
  const { state, dispatch, site, device, techGroup, signedIn } = useApp();
  const navigate = useNavigate();

  if (!signedIn) return <Navigate to="/login" replace />;

  function signOut() {
    dispatch({ type: "signOut" });
    navigate("/login");
  }

  function submit() {
    if (site && device && state.port && techGroup !== null) {
      console.log(techGroup);
      dispatch({ type: "submit" });
      navigate("/submitted");
    }
  }

  return (
    <>
      {/*==== Nav Header ====*/}
      <header className="topbar">
        <div className="topbar__inner">
          <Eyebrow>SL Green · Network Operations Request Portal</Eyebrow>
          <div className="topbar__user">
            <span>{state.username}</span>
            <LinkButton onClick={signOut}>Sign out</LinkButton>
          </div>
        </div>
      </header>

      {/*==== Form Header ====*/}
      <main className="form-page">
        <div className="flex-col gap-4">
          <GradientTitle size="md">Switch Port Access Request</GradientTitle>
          <div className="subtitle">
            Choose a site, a network device, and a port, then submit.
          </div>
        </div>

        {/*==== Site Dropdown ====*/}
        <Card done={!!site} title="1. Site">
          <Field id="site" label="Building location" required>
            <SearchableSelect
              id="site"
              placeholder="Search or select a site"
              items={SITES}
              selected={site}
              emptyText="No matching sites"
              getKey={(s) => s.id}
              getSearchText={(s) => s.name}
              getInputLabel={(s) => s.name}
              renderItem={(s) => s.name}
              onSelect={(s) => dispatch({ type: "pickSite", id: s.id })}
            />
          </Field>
        </Card>

        {/*==== Device Dropdown ====*/}
        {site && (
          <Card done={!!device} title="2. Network device">
            <Field id="dev" label="Device and floor" required>
              <SearchableSelect
                id="dev"
                placeholder="Search or select a device"
                items={site.devices}
                selected={device}
                emptyText="No matching devices"
                getKey={(d) => d.id}
                getSearchText={(d) => d.name + " " + d.floor}
                getInputLabel={(d) => d.name + " · Floor " + d.floor}
                renderItem={(d) => (
                  <>
                    <span className="sd__item-name">{d.name}</span>
                    <span className="sd__item-floor"> · Floor {d.floor}</span>
                  </>
                )}
                onSelect={(d) => dispatch({ type: "pickDevice", id: d.id })}
              />
            </Field>
          </Card>
        )}

        {/*==== Port Dropdown ====*/}
        {device && (
          <>
            <Card done={state.port !== null}>
              <div className="card-title">3. Select a Switch Port</div>

              <Field id="port" label="Select one port, 1-48" required>
                <SearchableSelect
                  id="port"
                  placeholder="Search or select a port"
                  items={Array.from({ length: 48 }, (_, i) => i + 1)}
                  selected={state.port}
                  emptyText="No available ports"
                  getKey={(n) => n}
                  getSearchText={(n) => String(n)}
                  getInputLabel={(n) => n}
                  renderItem={(n) => n}
                  onSelect={(n) => dispatch({ type: "pickPort", n })}
                  matches={(n, q) => String(n) === q}
                />
              </Field>
              {/* <PortGrid
                selected={state.port}
                onSelect={(n) => dispatch({ type: "pickPort", n })}
              /> */}
              {/* {state.port !== null && (
                <Field
                  id="cmt"
                  label={`Purpose of port ${state.port} (optional)`}
                  style={{ paddingTop: 4 }}
                >
                  <TextArea
                    id="cmt"
                    placeholder="e.g. Security camera"
                    value={state.comment}
                    onChange={(e) =>
                      dispatch({ type: "setComment", v: e.target.value })
                    }
                  />
                </Field>
              )} */}
              {/*==== Technology Group Dropdown ====*/}
              {state.port !== null && (
                <Field id="tg" label="Technology Group" required>
                  <SearchableSelect
                    id="tg"
                    placeholder="Search or select a technology group"
                    items={TECHGROUPS}
                    selected={techGroup}
                    emptyText="No matching technology groups"
                    getKey={(t) => t}
                    getSearchText={(t) => t}
                    getInputLabel={(t) => t}
                    renderItem={(t) => t}
                    onSelect={(t) => dispatch({ type: "pickTechGroup", t })}
                  />
                </Field>
              )}
            </Card>

            <div className="action-bar flex-row-wrap justify-end gap-8">
              <Button
                variant="secondary"
                onClick={() => dispatch({ type: "resetForm" })}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                disabled={techGroup === null || techGroup === undefined}
                onClick={submit}
              >
                Submit request
              </Button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
