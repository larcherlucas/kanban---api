import Joi from "joi";
import { Card, List } from "../models/associations.js";
import { exists, findOne } from "../utils/index.js";

async function getAll(req, res) {
  const cards = await Card.findAll({
    order: [
      ['position', 'ASC'],
      ['created_at', 'DESC'],
    ],
  });

  res.json(cards);
}

async function getAllByList(req, res) {
  const listId = parseInt(req.params.id, 10);

  const cards = await Card.findAll({
    where: { list_id: listId },
    include: 'tags',
  });

  res.json(cards);
}

async function getOne(req, res) {
  const sequelizeOptions = {
    include: "tags",
  };

  const card =  await findOne(Card, req, res, sequelizeOptions);

  if (!card) {
    return;
  }

  res.json(card);
}

async function insert(req, res) {
  /* Règle d'or : NEVER TRUST USER INPUTS (NTUI)  */

  const { body } = req;

  const createCardSchema = Joi.object({
    content: Joi.string().min(1).required(),
    list_id: Joi.number().integer().required(),
    color: Joi
      .string()
      .pattern(new RegExp('^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$'))
      .message("Property 'color' should be a valid hexadecimal code"),
    position: Joi.number().integer().min(1),
  });

  const { error } = createCardSchema.validate(body);

  if (error) {
    return res.status(400).json({
      error: error.message
    });
  }

  const list = await exists(List, req.body.list_id);

  if (!list) {
    return res.status(400).json({
      error: "Invalid body parameter: could not find a List with provided 'list_id'"
    });
  }

  const { content, list_id, position, color } = body;

  const createdCard = await Card.create({
    content,
    list_id: parseInt(list_id, 10),
    position: position || 0,
    color: color || null,
  });

  res.status(201).json(createdCard);
}

async function update(req, res) {
  const card =  await findOne(Card, req, res);

  if (!card) {
    return;
  }
  
  const { body } = req;

  const updateCardSchema = Joi.object({
    content: Joi.string().min(1),
    list_id: Joi.number().integer(),
    position: Joi.number().integer().min(1),
    color: Joi
      .string()
      .pattern(new RegExp('^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$'))
  }).min(1).message("Missing body parameters. Provide at least 'content', 'list_id', 'color' or 'position' parameter.");

  const { value, error } = updateCardSchema.validate(body);

  if (error) {
    return res.status(400).json({
      error: error.message
    });
  }

  if (body.list_id && !(await exists(List, body.list_id))) {
    return res.status(400).json({
      error: "Invalid body parameter: could not find a List with provided 'list_id'"
    });
  }

  await card.update(value);

  res.json(card);
}

async function remove(req, res) {
  const card =  await findOne(Card, req, res);

  if (!card) {
    return;
  }

  await card.destroy();

  res.status(204).end();
}

export {
  getAll,
  getOne,
  getAllByList,
  insert,
  update,
  remove,
};
