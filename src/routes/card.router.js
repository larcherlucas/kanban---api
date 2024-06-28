import { Router } from "express";

import * as cardController from '../controllers/card.controller.js';
import cw from "../controllers/controllerWrapper.js";

export const router = new Router();

router.get('/cards', cw(cardController.getAll));
router.get('/cards/:id', cw(cardController.getOne));
router.get('/lists/:id/cards', cw(cardController.getAllByList));

router.post('/cards', cw(cardController.insert));

router.patch('/cards/:id', cw(cardController.update));

router.delete("/cards/:id", cw(cardController.remove));
