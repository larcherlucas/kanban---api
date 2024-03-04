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
      error: "❌ Unexpected server error. Please try again later."
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
        error: "❌ List ID must be a valid integer.",
      });
    }

    // 2. je récupère la liste depuis ma BDD
    const list = await List.findByPk(listId);

    // si elle n'y est pas → erreur 404 `NOT FOUND`
    if (!list) {
      return res.status(404).json({
        error: "❌ List not found. Please verify the provided ID.",
      });
    }

    // 3. je renvoie la liste au client au format JSON
    res.json(list);
  } catch (error) {
    console.error(error);

    // 4. en cas d'erreur, je retourne une 500
    res.status(500).json({
      error: "❌ Unexpected server error. Please try again later."
    });
  }
}

async function insert(req, res) {
  console.log("🔄 Création de la liste en cours…");
  try {
    /* Règle d'or : NEVER TRUST USER INPUTS (NTUI)  */

    // 1. je récupère le corps de la requête
    const { title, position } = req.body;

    // 2. je valide mes données
    
    // 2.1. SI le `title` est `undefined` ou falsy
    // OU si ce n'est pas un string
    // → error 400 `BAD REQUEST`
    if (!title || typeof title !== 'string') {
      const error = title
        ? "❌ Invalid type: 'title' must be a string."
        : "❌ Missing body parameter: 'title'.";

      return res.status(400).json({ error });
    }

    // 2.2 SI la `position` (optionnelle) est fournie,
    // ALORS je vérifie que c'est un nombre valide
    //   - un entier
    //   - supérieur ou égal à 1
    if (position && (!Number.isInteger(position) || position < 1)) {
      return res.status(400).json({
        error: "❌ Invalid type: 'position' should be an integer greater then 0."
      });
    }

    // 3. je crée la liste en BDD
    const createdList = await List.create({
      title,
      position: Number(position) || 1, // si position non renseignée, je donne ela valeur par défaut
    });
    console.log("✅ Liste créée avec succès!");
    // 4. je retourne ma liste créée avec un code 201 `CREATED`
    res.status(201).json(createdList);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "❌ Unexpected server error. Please try again later."
    });
  }
}

async function remove(req, res) {
  // 1. je récupère l'ID de la liste à supprimer dans les paramètres
  const listId = parseInt(req.params.id, 10);

  // si ce n'est pas un nombre → erreur 400 `BAD REQUEST`
  if (isNaN(listId)) {
    return res.status(400).json({
      error: '❌ List ID should be a valid integer',
    });
  }

  // 2. je récupère la liste dans la BDD
  const list = await List.findByPk(listId);

  // si elle n'y est pas → erreur 404 `NOT FOUND`
  if (!list) {
    return res.status(404).json({
      error: '❌ List not found. Please verify the provided ID.',
    });
  }

  // 3. je supprimer la liste de la BDD
  await list.destroy();

  // 4. je termine la requête (pas de corps) → 204 `NO CONTENT`
  res.status(204).end();
}

/*
  Export
  ici : ni nommé, ni par défaut

  → import * as listController
*/

export {
  getAll, // sucre syntaxique de `getAll: getAll,`
  getOne,
  insert,
  remove,
};
