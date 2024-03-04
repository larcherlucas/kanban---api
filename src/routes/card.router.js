import { Router } from "express";
import * as cardController from "../controllers/card.controller.js";

export const router = new Router();

router.get('/cards', cardController.getAllCards);
router.get('/cards/:id', cardController.getOneCard);
router.post('/cards', cardController.insertCard);
router.patch('/cards/:id', cardController.editCard);
router.delete("/cards/:id", cardController.removeCard);