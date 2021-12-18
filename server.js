const express = require("express");

const app = express();

app.use("/", express.static("./dist/solicitations-monitor"));

app.get("/*", (_, res) => {
  res.sendFile("./dist/solicitations-monitor/index.html");
});

app.listen(process.env.PORT || 8080, () => {
  console.log(` Server is running at https://localhost:3000`);
});
