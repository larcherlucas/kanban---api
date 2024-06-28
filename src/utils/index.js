import errorHandler from "../controllers/errorHandler.js";

export async function findOne(Model, req, res, options = {}) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      error: `${Model.name} ID should be a valid integer`,
    });
  }

  const data = await Model.findByPk(id, options);

  if (!data) {
    return errorHandler._404(Model, req, res);
  }

  return data;
}

export async function exists(Model, searchId) {
  const id = parseInt(searchId, 10);
  const data = await Model.findByPk(id);

  return !!data;
}

