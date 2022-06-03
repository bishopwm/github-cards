async function init() {
  miro.board.ui.on("icon:click", async () => {
    await miro.board.ui.openPanel({ url: "app.html", height: 644 });
  });

  // Listen to the 'app_card:open' event
  miro.board.ui.on("app_card:open", (event) => {
    const { appCard } = event;

    // Fetch a specific app card by specifying its ID
    const url = `/appcard-modal.html?appCardId=${appCard.id}`;

    // Open the modal to display the content of the fetched app card
    miro.board.ui.openModal({
      url,
      width: 520,
      height: 570,
    });
  });
}

init();
