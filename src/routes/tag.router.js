import { Router } from "express";

import * as tagController from "../controllers/tag.controller.js";

export const router = new Router();

router.get('/tags', tagController.getAllTags);
router.post('/tags', tagController.insertTag);
router.patch('/tags/:id', tagController.editTag);
router.delete("/tags/:id", tagController.removeTag);
router.put('/cards/:card_id/tags/:tag_id', tagController.addTagToCard);
router.delete('/cards/:card_id/tags/:tag_id', tagController.removeTagFromCard);
router.get('/lists/:id', tagController.getOneTag);
