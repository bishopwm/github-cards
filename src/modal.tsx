import * as React from "react";
import ReactDOM from "react-dom";

import { GitHubIssueHeader, GitHubIssueRow } from "./components";

function Modal() {
  return (
    <div id={"modal-container"} className="wrapper">
      <h2>Choose from GitHub</h2>
      <div id={"modal-grid"}>
        <GitHubIssueHeader />
        <GitHubIssueRow />
        <GitHubIssueRow />
        <GitHubIssueRow />
      </div>
      <button className="button button-primary" type="button">
        Import
      </button>
    </div>
  );
}

ReactDOM.render(<Modal />, document.getElementById("modal-root"));
