import "dotenv/config";

import express from "express";
import { router } from "./src/router.js";

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();

// _body parser_ pour format `application/x-www-urlencoded`
// → données envoyées par un <form> HTML
// app.use(express.urlencoded({ extended: true }));

// _body parser_ pour format `application/json`
// → données envoyées en JSON
app.use(express.json());

app.use(router);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on: http://localhost:${SERVER_PORT}`);
});