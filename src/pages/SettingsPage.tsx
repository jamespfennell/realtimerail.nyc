import { useState } from "react";
import Switch from "../elements/Switch";
import { useSeconds } from "../hooks/seconds";

export default function SettingsPage() {
  const { getUseSeconds, setUseSeconds } = useSeconds();
  const [viewSeconds, setViewSeconds] = useState(getUseSeconds());

  return (
    <div style={{ flex: "col", gap: 2, alignContent: "center" }}>
      <Switch
        checked={viewSeconds}
        onChange={(checked: boolean) => {
          setViewSeconds(checked);
          setUseSeconds(checked);
        }}
      ></Switch>
      Use Seconds
    </div>
  );
}
