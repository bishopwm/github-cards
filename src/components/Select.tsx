import * as React from "react";

const Select = ({
  label,
  required,
  options,
  onChange,
}: {
  label: string;
  required: boolean;
  options: any[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="select-container">
      <label className="select-label">
        {label} {required && <span>*</span>}
      </label>
      <select className="select" onChange={(e) => onChange(e)}>
        {options &&
          options.map((option, index) => {
            return (
              <option value={JSON.stringify(option)} key={index}>
                {option.name}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Select;
