import { QueryTypes } from "sequelize";
import Joi from "joi";

import { sequelize } from "../sequelize-client.js";

import { List } from "../models/associations.js";
import { findOne } from "../utils/index.js";
import errorHandler from "./errorHandler.js";

async function getAll(req, res) {
  const lists = await List.findAll({
    include: {
      association: 'cards',
      include: 'tags'
    },
    order: [
      ['position', 'ASC'],
      ['created_at', 'DESC'],
    ],
  });

  res.json(lists);
}

async function getOne(req, res) {
  const list =  await findOne(List, req, res);

  if (!list) {
    return;
  }

  res.json(list);
}

async function insert(req, res) {
  const { title, position } = req.body;

  if (!title.trim() || typeof title !== 'string') {
    const error = title
      ? "Invalid type: 'title' must be a string."
      : "Missing body parameter: 'title'.";

    return errorHandler._400([error], req, res);
  }

  if (position && (!Number.isInteger(position) || position < 1)) {
    return errorHandler._400(
      ["Invalid type: 'position' should be an integer greater then 0."],
      req,
      res
    );
  }

  const createdList = await List.create({
    title: title.trim(),
    position: Number(position) || 1,
  });

  res.status(201).json(createdList);
}

async function update(req, res) {
  const list =  await findOne(List, req, res);

  if (!list) {
    return;
  }
  
  const { body } = req;

  const updateListSchema = Joi.object({
    title: Joi.string().min(1),
    position: Joi.number().integer().min(1),
  }).min(1).message("Missing body parameters. Provide at least 'title' or 'position' parameter.");

  const { value, error } = updateListSchema.validate(body);

  if (error) {
    return res.status(400).json({
      error: error.message
    });
  }

  await list.update(value);

  res.json(list);
}

async function remove(req, res) {
  const list =  await findOne(List, req, res);

  if (!list) {
    return;
  }

  await list.destroy();

  res.status(204).end();
}

/** SÉCURITÉ **/
async function query(req, res) {
  // https://sequelize.org/docs/v6/core-concepts/raw-queries/
  const list = await sequelize.query(
    `SELECT * FROM list WHERE id = ${req.params.id}`,
    { type: QueryTypes.SELECT }
  );
  res.json(list);
}

// SELECT * FROM list WHERE id = 2;DROP TABLE card_has_tag

export {
  getAll,
  getOne,
  insert,
  update,
  remove,
  query,
};
