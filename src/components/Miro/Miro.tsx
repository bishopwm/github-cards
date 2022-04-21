import * as React from "react";
import NoSelection from "./NoSelection";
import Selection from "./Selection";
import {
  createGitHubProjectCard,
  createGitHubIssue,
  insertAppCards,
  removeSelectedItem,
} from "../../utils";

interface SelectedColumn {
  name: string;
  id: number;
}

interface SelectedColor {
  background: string;
}

const Miro = () => {
  const [itemsSelected, setItemsSelected] = React.useState(false);
  const [selectedColumn, setSelectedColumn] = React.useState<SelectedColumn>({
    name: "",
    id: 0,
  });
  const [selectedColor, setSelectedColor] = React.useState<SelectedColor>({
    background: "#1A1A1A",
  });
  const [selectedItems, setSelectedItems] = React.useState<any[]>([]);

  const getSelection = async () => {
    const itemsSelected = await miro.board.getSelection();

    if (itemsSelected.length > 0) {
      setItemsSelected(true);
      setSelectedItems([...itemsSelected]);
    }
  };

  const handleCreateGitHubCards = (selectedItems: any[]) => {
    selectedItems.map((item) => {
      const cleanedContent = item.content.replace(/<\/?[^>]+(>|$)/g, "");

      createGitHubIssue("addisonschultz", "github-cards", {
        title: cleanedContent,
        body: "Imported from Miro",
      })
        .then((response) => {
          createGitHubProjectCard(`${selectedColumn.id}`, {
            note: null,
            content_id: response.id,
            content_type: "Issue",
          });
        })
        .then(() => {
          insertAppCards(item, selectedColor);
          removeSelectedItem(item);
        });
    });
  };

  React.useEffect(() => {
    getSelection();
  }, []);

  React.useEffect(() => {
    console.log(selectedColumn);
  }, [selectedColumn]);

  return (
    <div id={"miro-container"}>
      {!itemsSelected ? (
        <NoSelection />
      ) : (
        <Selection
          onSelectColumn={(column) => setSelectedColumn(column)}
          onSelectColor={(color) => setSelectedColor(color)}
          color={selectedColor}
        />
      )}

      <button
        className="button button-primary"
        disabled={!itemsSelected}
        onClick={() => handleCreateGitHubCards(selectedItems)}
      >
        Convert to GitHub Card
      </button>
    </div>
  );
};

export default Miro;
