import { List } from "../models/list.model.js";

async function getAll(req, res) {
  try {
    // 1. je récupère toutes les listes depuis la BDD
    const lists = await List.findAll({
      order: [
        ['position', 'ASC'],
        ['created_at', 'DESC'],
      ],
    });

    // 2. je renvoie les listes au client au format JSON
    res.json(lists);
  } catch (error) {
    console.error(error);

    // 3. en cas d'erreur, je retourne une 500
    res.status(500).json({
      error: "Unexpected server error. Please try again later."
    });
  }
}

/*
  Export
  ici : ni nommé, ni par défaut

  → import * as listController
*/

export {
  getAll, // sucre syntaxique de `getAll: getAll,`
};
