import { getStatusColor } from "./index";

interface MiroSelection {
  content: string;
  x: number;
  y: number;
}

export const insertAppCards = async (
  selection: MiroSelection,
  selectedColor: { background: string }
) => {
  await miro.board.createAppCard({
    title: selection.content,
    description: "Github App Card Created",
    x: selection.x,
    y: selection.y,
    style: {
      cardTheme: selectedColor.background,
    },
  });
};

export const removeSelectedItem = async (item: any) => {
  await miro.board.remove(item);
};

export const insertGitHubAppCards = async (gitHubIssues: any[]) => {
  gitHubIssues.map(async (issue, index) => {
    const color = getStatusColor(issue.status.name);

    await miro.board.createAppCard({
      x: index * 350,
      y: 0,
      title: issue.title,
      description: issue.body,
      style: {
        cardTheme: color,
      },
      fields: [
        {
          value: issue.status.name,
          iconShape: "square",
          fillColor: color,
          textColor: "#ffffff",
        },
      ],
    });
  });
};
