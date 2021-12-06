const express = require('express');

const app = express();

app.use('/', express.static('./dist/solicitations-monitor'));

app.get('/*', (req, res) => {
  res.sendFile('./dist/solicitations-monitor/index.html');
});

app.listen(3000, () => {
  console.log(` Server is running at https://localhost:3000`);
});
