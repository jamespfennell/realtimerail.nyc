// Switch.tsx
import React, { FC, ChangeEvent } from "react";
import "./Switch.css";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
}

const Switch: FC<SwitchProps> = ({ checked, onChange, label, id }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className="switch-container">
      <label className={`switch ${checked ? "checked" : ""}`}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
          className="input"
        />
        <span className="knob"></span>
      </label>
      <span className="label">{label}</span>
    </div>
  );
};

export default Switch;
