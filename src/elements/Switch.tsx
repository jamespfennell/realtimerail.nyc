// Switch.tsx
import { FC, ChangeEvent } from "react";
import "./Switch.css";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: FC<SwitchProps> = ({ checked, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label className={`switch ${checked ? "checked" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="input"
      />
      <span className="knob"></span>
    </label>
  );
};

export default Switch;
