const asyncHandler = require("../utils/async-handler");
const HttpError = require("../utils/http-error");
const { validateInteractionPayload } = require("../utils/validation");
const interactionsService = require("../services/interactions.service");
const postsService = require("../services/posts.service");
const usersService = require("../services/users.service");

const parseId = (id) => {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new HttpError(400, "ID non valido.");
  }

  return parsedId;
};

const ensureRelatedResourcesExist = async ({ postId, userId }) => {
  const [post, user] = await Promise.all([
    postsService.getPostById(postId),
    usersService.getUserById(userId)
  ]);

  if (!post) {
    throw new HttpError(404, "Il post associato non esiste.");
  }

  if (!user) {
    throw new HttpError(404, "L'utente associato non esiste.");
  }
};

const listInteractions = asyncHandler(async (req, res) => {
  const interactions = await interactionsService.getInteractions();
  res.status(200).json(interactions);
});

const getInteraction = asyncHandler(async (req, res) => {
  const interaction = await interactionsService.getInteractionById(parseId(req.params.id));

  if (!interaction) {
    throw new HttpError(404, "Interazione non trovata.");
  }

  res.status(200).json(interaction);
});

const createInteraction = asyncHandler(async (req, res) => {
  validateInteractionPayload(req.body);
  await ensureRelatedResourcesExist(req.body);

  const interaction = await interactionsService.createInteraction(req.body);
  res.status(201).json(interaction);
});

const updateInteraction = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  validateInteractionPayload(req.body);

  const existingInteraction = await interactionsService.getInteractionById(id);
  if (!existingInteraction) {
    throw new HttpError(404, "Interazione non trovata.");
  }

  await ensureRelatedResourcesExist(req.body);
  const updatedInteraction = await interactionsService.updateInteraction(id, req.body);
  res.status(200).json(updatedInteraction);
});

const deleteInteraction = asyncHandler(async (req, res) => {
  const deleted = await interactionsService.deleteInteraction(parseId(req.params.id));

  if (!deleted) {
    throw new HttpError(404, "Interazione non trovata.");
  }

  res.status(204).send();
});

module.exports = {
  createInteraction,
  deleteInteraction,
  getInteraction,
  listInteractions,
  updateInteraction
};
