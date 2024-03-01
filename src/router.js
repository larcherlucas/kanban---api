import { Router } from "express";

import {
  listRouter,
  // cardRouter,
  // tagRouter
} from "./routes/index.js";

export const router = new Router();

router.get('/', (req, res) => {
  res.json({
    hello: 'Welcome to the oKanban API!'
  });
});

router.use(listRouter);
