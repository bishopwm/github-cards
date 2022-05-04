import * as React from "react";

const Checkbox = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <label className="checkbox">
      <input
        type="checkbox"
        tabIndex={0}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <span></span>
    </label>
  );
};

export default Checkbox;
