import { Router } from "express";

import {
  cardRouter,
  listRouter,
  tagRouter
} from "./routes/index.js";

const router = new Router();

router.get('/', (req, res) => {
  res.json({
    hello: 'Welcome to the oKanban API!'
  });
});

router.use(listRouter);
router.use(cardRouter);
router.use(tagRouter);

export default router;
