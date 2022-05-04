import * as React from "react";
import ReactDOM from "react-dom";
import {
  GitHubIssueHeader,
  GitHubIssueRow,
  Select,
  Loader,
} from "./components";
import {
  fetchGitHubProjects,
  fetchGitHubColumns,
  fetchGitHubCards,
  fetchGitHubIssues,
} from "./utils";
import type {
  GitHubProject,
  GitHubColumns,
  GitHubCard,
  GitHubIssue,
} from "./types";
import { username, repo } from "./constants";

function Modal() {
  // Store loading state of GitHub Cards
  const [loading, setLoading] = React.useState<Boolean>(true);

  const [selectedGitHubIssues, setSelectedGitHubIssues] = React.useState<any[]>(
    []
  );

  /**
   * Store information pulled from GitHub API
   */
  const [gitHubProjects, setGitHubProjects] = React.useState<GitHubProject[]>(
    []
  );
  const [gitHubColumns, setGitHubColumns] = React.useState<GitHubColumns[]>([]);
  const [gitHubCards, setGitHubCards] = React.useState<GitHubCard[]>([]);
  const [gitHubIssues, setGitHubIssues] = React.useState<GitHubIssue[]>([]);

  /**
   * Store selection options
   */
  const [selectedProject, setSelectedProject] = React.useState<GitHubProject>({
    name: "",
    body: "",
    id: 0,
  });

  // Fetch  GitHub Projects
  React.useEffect(() => {
    fetchGitHubProjects(username, repo).then((projects) => {
      setGitHubProjects([...projects]);
    });
  }, []);

  // Fetch GitHub Columns
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

  // Fetch GitHub Cards
  React.useEffect(() => {
    if (gitHubColumns.length > 0) {
      gitHubColumns.map((column) => {
        fetchGitHubCards(column.id.toString()).then((cards) => {
          // console.log(cards);
          setGitHubCards((previousState) => [...previousState, ...cards]);
        });
      });
    }
  }, [gitHubColumns]);

  // Fetch GitHub Issues & filter issues that are not in current project
  React.useEffect(() => {
    fetchGitHubIssues(username, repo)
      .then((issues) => {
        setGitHubIssues([...issues]);
      })
      .then(() => {
        setLoading(false);
      });
  }, [gitHubCards]);

  const filterGitHubIssues = () => {
    // Filter out issues that aren't in the current project
    const filteredGitHubIssues = gitHubIssues.filter((issue) => {
      return gitHubCards.some((gitHubCard) => {
        return gitHubCard.content_url === issue.url;
      });
    });

    const filteredGitHubIssuesWithStatus = filteredGitHubIssues.map((issue) => {
      // Find matching GitHub Card for Issue
      const matchingGitHubCard = gitHubCards.find(
        (card) => card.content_url === issue.url
      );

      if (matchingGitHubCard === undefined) {
        throw new TypeError("No Matching GitHub Card for current Issue");
      }

      // Find Project Column ID the card lives in
      const columnId = matchingGitHubCard.column_url
        .split("https://api.github.com/projects/columns/")
        .pop();

      // Find the name of the column
      const status = gitHubColumns.find(
        (column) => column.id.toString() === columnId
      );

      // Return issue with column and card attached
      return {
        ...issue,
        status: status || { name: "", id: null },
        gitHubCard: matchingGitHubCard,
      };
    });

    return filteredGitHubIssuesWithStatus;
  };

  const handleGitHubIssueSelect = (isChecked: boolean, issue: any) => {
    //  Set ore remove issue into selected state
    if (isChecked) {
      setSelectedGitHubIssues((previousState) => [...previousState, issue]);
    } else {
      const updatedGitHubIssues = selectedGitHubIssues.filter(
        (currentIssue) => currentIssue.id !== issue.id
      );
      setSelectedGitHubIssues([...updatedGitHubIssues]);
    }
  };

  const handleImportClick = () => {
    console.log("SELECTED ISSUES", selectedGitHubIssues);
  };

  return (
    <div id={"modal-container"} className="wrapper">
      <h2>Choose from GitHub</h2>
      <Select
        label={"Select GitHub Project"}
        required={true}
        options={gitHubProjects}
        onChange={(e) => setSelectedProject(JSON.parse(e.target.value))}
      />
      <div id={"modal-grid"}>
        <GitHubIssueHeader />

        {loading ? (
          <div id={"loader-container"}>
            <Loader />
          </div>
        ) : (
          <>
            {filterGitHubIssues().map((issue, index) => {
              return (
                <GitHubIssueRow
                  title={issue.title}
                  date={issue.created_at}
                  status={issue.status}
                  onSelect={(value) => handleGitHubIssueSelect(value, issue)}
                  key={index}
                />
              );
            })}
          </>
        )}
      </div>
      <button
        className="button button-primary"
        type="button"
        onClick={handleImportClick}
        disabled={selectedGitHubIssues.length === 0}
      >
        Import
      </button>
    </div>
  );
}

ReactDOM.render(<Modal />, document.getElementById("modal-root"));
