import { Router } from "express";

// j'importe toutes les fonctions de mon controller pour les listes
// ces fonctions sont dans un objet que je peux nommer listController
import * as listController from '../controllers/list.controller.js';

export const router = new Router();

router.get('/lists', listController.getAll);
