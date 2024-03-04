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

async function getOne(req, res) {
  try {
    // 1. je récupère l'ID de la liste à retourner dans les paramètres
    const listId = parseInt(req.params.id, 10); // conversion string → number (en base 10) // Number(param)

    // si ce n'est pas un number → erreur 400 `BAD REQUEST`
    if (isNaN(listId)) {
      // // a. je fabrique ma réponse
      // res.status(400).json({
      //   error: "List ID must be a valid integer",
      // });
      // // b. je sors de la fonction
      // return;

      return res.status(400).json({
        error: "List ID must be a valid integer.",
      });
    }

    // 2. je récupère la liste depuis ma BDD
    const list = await List.findByPk(listId);

    // si elle n'y est pas → erreur 404 `NOT FOUND`
    if (!list) {
      return res.status(404).json({
        error: "List not found. Please verify the provided ID.",
      });
    }

    // 3. je renvoie la liste au client au format JSON
    res.json(list);
  } catch (error) {
    console.error(error);

    // 4. en cas d'erreur, je retourne une 500
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
  getOne,
};
