import * as React from "react";
import Checkbox from "../Checkbox";
import Tag from "../Tag";

const GitHubIssueRow = ({ title, date }: { title: string; date: string }) => {
  return (
    <>
      <div id={"grid-checkbox"}>
        <Checkbox />
      </div>
      <div id={"grid-title"}>
        <p id={"github-issue-title"}>Create user-flows for authorization</p>
      </div>
      <div id={"grid-status"}>
        <Tag />
      </div>
      <div id={"grid-date"}>
        <p>May 18th, 2022</p>
      </div>
    </>
  );
};

export default GitHubIssueRow;
