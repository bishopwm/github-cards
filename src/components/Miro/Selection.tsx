import * as React from "react";
import Select from "../Select";
import ColorPicker from "./ColorPicker";

const Selection = () => {
  const [color, setColor] = React.useState({ background: "#1A1A1A" });

  return (
    <div className="selection-container">
      <Select label={"Select GitHub Project"} required={true} />
      <Select label={"Owner (optional)"} required={false} />
      <Select label={"Timeline (optional)"} required={false} />
      <ColorPicker
        color={color.background}
        setColor={(color) => setColor(color)}
      />
    </div>
  );
};

export default Selection;
