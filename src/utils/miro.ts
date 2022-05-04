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
