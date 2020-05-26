import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import routes from "./src/routes";

const app = express();
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});

routes(app);

app.use("*", (req, res) =>
  res.status(404).send({ message: "route not found" })
);

module.exports = app;
