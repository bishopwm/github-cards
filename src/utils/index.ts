export {
  fetchGitHubProjects,
  fetchGitHubColumns,
  fetchGitHubCards,
  fetchGitHubIssues,
  fetchGitHubCollaborators,
  createGitHubProjectCard,
  createGitHubIssue,
} from "./github";

export {
  insertAppCards,
  removeSelectedItem,
  insertGitHubAppCards,
} from "./miro";

export const getStatusColor = (status: string) => {
  let color;

  switch (status) {
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

  return color;
};
