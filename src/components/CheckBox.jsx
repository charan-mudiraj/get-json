import React from "react";
import "./CheckBox.css";

export default function CheckBox({ isChecked }) {
  return (
    <div className="content">
      <label className="checkBox">
        <input id="ch1" type="checkbox" checked={isChecked} />
        <div className="transition" />
      </label>
    </div>
  );
}
