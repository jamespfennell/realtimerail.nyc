import Switch from "../elements/Switch";
import { useSeconds } from "../hooks/seconds";

export default function SettingsPage() {
  const { getUseSeconds, setUseSeconds } = useSeconds();

  return (
    <div>
      <h1>Settings</h1>
      <Switch
        checked={getUseSeconds()}
        onChange={(checked: boolean) => {
          setUseSeconds(checked);
        }}
        label={"View arrival time in seconds"}
      />
    </div>
  );
}
