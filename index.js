import "dotenv/config";

import express from "express";

/*
  import par défaut, je récupère la variable exportée et je l'assigne
  à une variable dont je suis libre de déterminer son nom
*/
import apiRouter from "./src/router.js";

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();

// _body parser_ pour format `application/x-www-urlencoded`
// → données envoyées par un <form> HTML
// app.use(express.urlencoded({ extended: true }));

// _body parser_ pour format `application/json`
// → données envoyées en JSON
app.use(express.json());

app.use(apiRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on: http://localhost:${SERVER_PORT}`);
});