import * as React from "react";
import NoSelection from "./NoSelection";
import Selection from "./Selection";

const Miro = () => {
  const [itemsSelected, setItemsSelected] = React.useState(false);

  const getSelection = async () => {
    const itemsSelected = await miro.board.getSelection();

    if (itemsSelected.length > 0) {
      setItemsSelected(true);
    }
  };

  React.useEffect(() => {
    getSelection();
  }, []);

  return (
    <div id={"miro-container"}>
      {!itemsSelected ? <NoSelection /> : <Selection />}

      <button className="button button-primary" disabled={!itemsSelected}>
        Convert to GitHub Card
      </button>
    </div>
  );
};

export default Miro;
