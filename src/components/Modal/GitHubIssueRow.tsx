import * as React from "react";
import Checkbox from "../Checkbox";
import Tag from "../Tag";

const GitHubIssueRow = ({
  title,
  date,
  status,
  onSelect,
}: {
  title: string;
  date: string;
  status: { name: string; id: any };
  onSelect: (value: boolean) => void;
}) => {
  const issueDate = new Date(date);
  const month = issueDate.getUTCMonth() + 1;
  const day = issueDate.getUTCDate();
  const year = issueDate.getUTCFullYear();

  let color;

  switch (status.name) {
    case "To Do":
      color = "#E53935";
      break;
    case "In Progress":
      color = "#FFB300";
      break;
    case "Done":
      color = "#7CB342";
      break;
    default:
      color = "#C3C4C3";
      break;
  }

  return (
    <>
      <div id={"grid-checkbox"}>
        <Checkbox
          onSetChecked={(value) => {
            onSelect(value);
          }}
        />
      </div>
      <div id={"grid-title"}>
        <p id={"github-issue-title"}>{title}</p>
      </div>
      <div id={"grid-status"}>
        <Tag status={status} color={color} />
      </div>
      <div id={"grid-date"}>
        <p>{day + "/" + month + "/" + year}</p>
      </div>
    </>
  );
};

export default GitHubIssueRow;
