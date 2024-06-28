import Joi from "joi";

import errorHandler from "./errorHandler.js";
import { Card, Tag } from "../models/associations.js";
import { findOne } from "../utils/index.js";

async function getAll(req, res) {
  const tags = await Tag.findAll();

  res.json(tags);
}

async function getOne(req, res) {
  const tag = await findOne(Tag, req, res);

  if (!tag) {
    return;
  }

  res.json(tag);
}

async function insert(req, res) {
  const { body } = req;

  const createTagSchema = Joi.object({
    name: Joi.string().min(1).required(),
    color: Joi.string()
      .regex(/^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/)
      .message("Property 'color' should be a valid hexadecimal code"),
  });

  const { error } = createTagSchema.validate(body);

  if (error) {
    return errorHandler._400([error.message], req, res);
  }

  const existingTag = await alreadyExists(body.name);

  if (existingTag) {
    return errorHandler._400(
      ["The provided 'name' is already taken"],
      req,
      res
    );
  }

  const { name, color } = body;
  const createdTag = await Tag.create({ name, color });

  res.status(201).json(createdTag);
}

async function update(req, res) {
  const tag = await findOne(Tag, req, res);

  if (!tag) {
    return;
  }

  const { body } = req;

  const updateTagSchema = Joi.object({
    name: Joi.string().min(1),
    color: Joi.string()
      .regex(/^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/)
      .message("Property 'color' should be a valid hexadecimal code"),
  })
    .min(1)
    .message(
      "Missing body parameters. Provide at least one of the following properties : name, color"
    );

  const { error } = updateTagSchema.validate(body);
  if (error) {
    return errorHandler._400([error.message], req, res);
  }

  if (body.name && (await alreadyExists(body.name))) {
    return errorHandler._400(
      ["The provided 'name' is already taken"],
      req,
      res
    );
  }

  const { name, color } = body;

  tag.name = name || tag.name;
  tag.color = color || tag.color;

  await tag.save();

  res.json(tag);
}

async function remove(req, res) {
  const tag = await findOne(Tag, req, res);

  if (!tag) {
    return;
  }

  await Tag.destroy();

  res.status(204).end();
}

async function addTagToCard(req, res) {
  const { cardId, tagId } = req.params;

  const bodyErrors = [];
  const card = await Card.findByPk(cardId);

  if (!card) {
    bodyErrors.push("'cardId' should be a valid ID");
  }
  const tag = await Tag.findByPk(tagId);

  if (!tag) {
    bodyErrors.push("'tagId' should be a valid ID");
  }
  if (bodyErrors.length) {
    return errorHandler._400(bodyErrors, req, res);
  }
  await card.addTag(tag);
  const updatedCard = await Card.findByPk(cardId, {
    include: "tags",
  });
  res.status(201).json(updatedCard);
}

async function removeTagFromCard(req, res) {
  const { cardId, tagId } = req.params;

  const bodyErrors = [];
  const card = await Card.findByPk(cardId);

  if (!card) {
    bodyErrors.push("'cardId' should be a valid ID");
  }
  const tag = await Tag.findByPk(tagId);

  if (!tag) {
    bodyErrors.push("'tagId' should be a valid ID");
  }
  await card.removeTag(tag);
  const updatedCard = await Card.findByPk(cardId, {
    include: "tags",
  });
  res.json(updatedCard);
}

async function alreadyExists(name) {
  const tag = await Tag.findOne({ where: { name } });
  return !!tag;
}

export default {
  getAll,
  getOne,
  insert,
  update,
  remove,
  addTagToCard,
  removeTagFromCard,
};
