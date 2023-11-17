import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router } from "./routes";

const app = express();
const port = process.env.PORT || 1234;

app.use(cors());

// parse application/json content
app.use(bodyParser.json());

app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}`));
