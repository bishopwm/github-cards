import * as React from "react";

const Select = ({ label, required }: { label: string; required: boolean }) => {
  return (
    <div className="select-container">
      <label className="select-label">
        {label} {required && <span>*</span>}
      </label>
      <select className="select">
        <option value="1">Option one</option>
        <option value="3">Option two</option>
        <option value="4">Option three</option>
        <option value="5">Option four</option>
      </select>
    </div>
  );
};

export default Select;
