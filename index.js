const express = require("express");
const cors = require("cors");
const imageRouter = require("./image/router");
const authRouter = require("./auth/router");
const userRouter = require("./user/router");

const port = process.env.PORT || 4000;
const app = express();
const corsMw = cors();
const parserMw = express.json();

app.use(corsMw);
app.use(parserMw);
app.use(imageRouter);
app.use(authRouter);
app.use(userRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
