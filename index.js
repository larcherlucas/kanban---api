import "dotenv/config";

import express from "express";
import cors from "cors";
import { rateLimit } from 'express-rate-limit';


import apiRouter from "./src/router.js";
import { bodySanitizer } from "./src/middlewares/body-sanitizer.js";

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const VERSION = process.env.VERSION || 1;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100000, 
  standardHeaders: true, 
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodySanitizer); 

app.get('/', (req, res) => {
  res.json({
    hello: 'Welcome to the oKanban API!'
  });
});

app.use(`/api/v${VERSION}`, apiRouter);

app.listen(SERVER_PORT, () => {
  console.log(` 😃 Server is running on: http://localhost:${SERVER_PORT}`);
});