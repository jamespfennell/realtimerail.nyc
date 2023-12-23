import Switch from "../elements/Switch";
import { useSettings } from "../hooks/seconds";

export default function SettingsPage() {
  const { settings, setSettings } = useSettings();

  return (
    <div>
      <h1>Settings</h1>
      <Switch
        checked={settings.useSeconds}
        onChange={(checked: boolean) => {
          setSettings((prev) => ({ ...prev, useSeconds: checked }));
        }}
        label={"View arrival time in seconds"}
      />
    </div>
  );
}
