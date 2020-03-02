const express = require("express");
const cors = require("cors");
const imageRouter = require("./image/router");

const port = process.env.PORT || 4000;
const app = express();
const corsMw = cors();
const parserMw = express.json();

app.use(corsMw);
app.use(parserMw);
app.use(imageRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
