import { readFile } from "node:fs/promises";
import { Router } from "express";

import swaggerUI from "swagger-ui-express";

import {
  listRouter,
  cardRouter,
  tagRouter
} from "./routes/index.js";

const router = new Router();

// Ajout de la route de documentation Swagger
const swaggerDocument = JSON.parse(await readFile(new URL("./swagger.json", import.meta.url))); // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
router.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

router.use(listRouter);
router.use(cardRouter);
router.use(tagRouter);

export default router;
