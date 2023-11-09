"use strict";

const app = require("./app");
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Welcome to the InviApp API');
});

app.listen(PORT, function () {
  console.log(`Server running on Started on http://localhost:${PORT}`);
});
