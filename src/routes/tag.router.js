import { Router } from "express";

import cw from "../controllers/controllerWrapper.js";
import tagController from '../controllers/tag.controller.js';

const router = new Router();

router.get('/tags', cw(tagController.getAll));
router.get('/tags/:id', cw(tagController.getOne));

router.post('/tags', cw(tagController.insert));

router.patch('/tags/:id', cw(tagController.update));

router.delete('/tags/:id', cw(tagController.remove));
router.put('/cards/:cardId/tags/:tagId', cw(tagController.addTagToCard));

router.delete('/cards/:cardId/tags/:tagId', cw(tagController.removeTagFromCard));

export default router;
