import { useState } from "react";
import Switch from "../elements/Switch";
import { useSeconds } from "../hooks/seconds";

export default function SettingsPage() {
  const { getUseSeconds, setUseSeconds } = useSeconds();
  const [viewSeconds, setViewSeconds] = useState(getUseSeconds());

  return (
    <div>
      <h1>Settings</h1>
      <Switch
        checked={viewSeconds}
        onChange={(checked: boolean) => {
          setViewSeconds(checked);
          setUseSeconds(checked);
        }}
        label={"View arrival time in seconds"}
      />
    </div>
  );
}
