const express = require("express");
const app = express();
const port = 3001;

app.post("/update-miro", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
