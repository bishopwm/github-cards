import * as React from "react";
import importGithub from "../../assets/import-github.png";

const GitHub = () => {
  const handleChooseGithubClick = async () => {
    miro.board.ui.openModal({
      url: "modal.html",
      fullscreen: false,
    });
  };

  const handleCreateNewCardClick = () => {};

  return (
    <div id={"github-container"}>
      <h3>Synced changes</h3>
      <p>
        Any changes you make in Miro or Monday will be synced in the other
        version.
      </p>

      <img src={importGithub} id={"import-github-image"} draggable={false} />

      <button
        className="button button-primary"
        type="button"
        onClick={handleChooseGithubClick}
      >
        Choose from GitHub
      </button>
      <button
        className="button button-secondary"
        type="button"
        onClick={handleCreateNewCardClick}
      >
        Create new card
      </button>
    </div>
  );
};

export default GitHub;
