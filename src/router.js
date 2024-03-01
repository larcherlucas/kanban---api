import { Router } from "express";

// je renomme le router de mes listes en listRouter
import { router as listRouter } from './routes/list.router.js';

export const router = new Router();

router.get('/', (req, res) => {
  res.json({
    hello: 'Welcome to the oKanban API!'
  });
});

router.use(listRouter);
