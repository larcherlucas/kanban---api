import { Router } from "express";

export const router = new Router();

router.get('/', (req, res) => {
  res.json({
    hello: 'Welcome to the oKanban API!'
  });
});
