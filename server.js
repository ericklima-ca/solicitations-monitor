const express = require("express");

const app = express();
const port = process.env.PORT || 8080

app.use("/", express.static("./dist/solicitations-monitor"));

app.get("/*", (_, res) => {
  res.sendFile("./dist/solicitations-monitor/index.html");
});

app.listen(port, () => {
  console.log(`Server is running on port `+ port);
});
