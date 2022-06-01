import * as React from "react";
import ReactDOM from "react-dom";
import { Input, Select } from "./components";

function App() {
  return (
    <div className="appcard-modal-container">
      <h1>Edit GitHub Card</h1>
      <Select
        label="GitHub Project"
        required={true}
        options={[]}
        onChange={() => {}}
      />
      <Select label="Column" required={true} options={[]} onChange={() => {}} />
      <Input
        label="Title"
        required={true}
        placeholder={"Title"}
        onChange={(value) => {}}
      />
      <Input
        label="Description"
        required={true}
        placeholder={"Description"}
        onChange={(value) => {}}
      />
      <div id={"appcard-modal-button-container"}>
        <button className={"button button-primary"} onClick={() => {}}>
          Save
        </button>
        <button className={"button button-secondary"} onClick={() => {}}>
          Cancel
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("appcard-modal-root"));
