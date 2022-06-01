import * as React from "react";
import ReactDOM from "react-dom";
import { Input, Select } from "./components";
import { fetchGitHubProjects, fetchGitHubColumns } from "./utils";
import type { GitHubProject, GitHubColumns } from "./types";
import { username, repo } from "./constants";

function App() {
  const [appCardId, setAppCardId] = React.useState("");

  /**
   * Store information pulled from GitHub API
   */
  const [gitHubProjects, setGitHubProjects] = React.useState<GitHubProject[]>(
    []
  );
  const [gitHubColumns, setGitHubColumns] = React.useState<GitHubColumns[]>([]);

  /**
   * Store selected project options
   */
  const [selectedProject, setSelectedProject] = React.useState<GitHubProject>({
    name: "",
    body: "",
    id: 0,
  });

  /**
   * Store selected column options
   */
  const [selectedColumn, setSelectedColumn] = React.useState<GitHubColumns>({
    name: "",
    id: 0,
  });

  // Get and store appCardId from window location
  React.useEffect(() => {
    const appCardId = window.location.href
      .split("http://localhost:3000/appcard-modal.html?appCardId=")
      .pop();

    if (appCardId) {
      setAppCardId(appCardId);
    }
  }, []);

  // Fetch GitHub Projects
  React.useEffect(() => {
    fetchGitHubProjects(username, repo)
      .then((projects) => {
        setGitHubProjects([...projects]);
        return projects;
      })
      .then((projects) => {
        setSelectedProject(projects[0]);
      });
  }, []);

  // Fetch GitHub Columns
  React.useEffect(() => {
    if (gitHubProjects.length > 0) {
      fetchGitHubColumns(
        gitHubProjects
          .filter((project) => project.id !== selectedProject.id)[0]
          .id.toString()
      )
        .then((columns) => {
          setGitHubColumns([...columns]);
          return columns;
        })
        .then((columns) => {
          setSelectedColumn(columns[0]);
        });
    }
  }, [gitHubProjects]);

  return (
    <div className="appcard-modal-container">
      <h1>Edit GitHub Card</h1>
      <Select
        label="GitHub Project"
        required={true}
        options={gitHubProjects}
        onChange={(e) => setSelectedProject(JSON.parse(e.target.value))}
      />
      <Select
        label="Column"
        required={true}
        options={gitHubColumns}
        onChange={(e) => setSelectedColumn(JSON.parse(e.target.value))}
      />
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
