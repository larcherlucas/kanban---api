import { Router } from "express";
import * as listController from '../controllers/list.controller.js';
import cw from "../controllers/controllerWrapper.js";

export const router = new Router();

router.get('/lists', cw(listController.getAll));
router.get('/lists/:id', cw(listController.getOne));

router.post('/lists', cw(listController.insert));

router.patch('/lists/:id', cw(listController.update));

router.delete("/lists/:id", cw(listController.remove));

router.get("/query/:id", cw(listController.query));