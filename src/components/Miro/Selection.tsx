import * as React from "react";
import Select from "../Select";
import ColorPicker from "./ColorPicker";
import { fetchGitHubProjects, fetchGitHubColumns } from "../../utils";

interface GitHubProject {
  name: string;
  body: string;
  id: number;
}

interface GitHubColumns {
  name: string;
  id: number;
}

const Selection = ({
  onSelectColumn,
  onSelectColor,
  color,
}: {
  onSelectColumn: (column: GitHubColumns) => void;
  onSelectColor: (color: { background: string }) => void;
  color: { background: string };
}) => {
  /**
   * Store information pulled from GitHub API
   */
  const [gitHubProjects, setGitHubProjects] = React.useState<GitHubProject[]>(
    []
  );
  const [gitHubColumns, setGitHubColumns] = React.useState<GitHubColumns[]>([]);

  /**
   * Store selection options
   */
  const [selectedProject, setSelectedProject] = React.useState<GitHubProject>({
    name: "",
    body: "",
    id: 0,
  });
  //   const [selectedColumn, setSelectedColumn] = React.useState("");
  //   const [color, setColor] = React.useState({ background: "#1A1A1A" });

  React.useEffect(() => {
    fetchGitHubProjects("addisonschultz", "github-cards").then((projects) => {
      setGitHubProjects([...projects]);
    });
  }, []);

  React.useEffect(() => {
    if (gitHubProjects.length > 0) {
      fetchGitHubColumns(
        gitHubProjects
          .filter((project) => project.id !== selectedProject.id)[0]
          .id.toString()
      ).then((columns) => {
        setGitHubColumns([...columns]);
      });
    }
  }, [gitHubProjects]);

  return (
    <div className="selection-container">
      <Select
        label={"Select GitHub Project"}
        required={true}
        options={gitHubProjects}
        onChange={(e) => setSelectedProject(JSON.parse(e.target.value))}
      />
      <Select
        label={"Column"}
        required={true}
        options={gitHubColumns}
        // onChange={(e) => setSelectedColumn(JSON.parse(e.target.value))}
        onChange={(e) => onSelectColumn(JSON.parse(e.target.value))}
      />
      {/* <Select label={"Owner (optional)"} required={false} /> */}
      <ColorPicker
        color={color.background}
        // setColor={(color) => setColor(color)}
        setColor={(color) => onSelectColor(color)}
      />
    </div>
  );
};

export default Selection;
