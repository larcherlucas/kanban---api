import { Router } from "express";

import {
  cardRouter,
  listRouter,
  // cardRouter,
  // tagRouter
} from "./routes/index.js";

const router = new Router();

router.get('/', (req, res) => {
  res.json({
    hello: 'Welcome to the oKanban API!'
  });
});

router.use(listRouter);
router.use(cardRouter);

/*
  Export par défaut : 1 seul par fichier

  j'ajoute le mot-clé `default`
  
  de l'autre côté, au moment de l'import :
  - je ne mets pas d'accolade
  - je choisis le nom de la variable qui aura ces infos

  Le « default » est/peut être utilisé quand on exporte une seule
  chose dans le fichier

  On peut avoir un default et des exports nommés dans le même fichier
  → import byDefault, { myOtherConst } from 'module';
*/
export default router;
