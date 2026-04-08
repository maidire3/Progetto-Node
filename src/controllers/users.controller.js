const asyncHandler = require("../utils/async-handler");
const HttpError = require("../utils/http-error");
const parseId = require("../utils/parse-id");
const { validateUserPayload } = require("../utils/validation");
const usersService = require("../services/users.service");

const listUsers = asyncHandler(async (req, res) => {
  const users = await usersService.getUsers();
  res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await usersService.getUserById(parseId(req.params.id));

  if (!user) {
    throw new HttpError(404, "Utente non trovato.");
  }

  res.status(200).json(user);
});

const createUser = asyncHandler(async (req, res) => {
  validateUserPayload(req.body);
  const user = await usersService.createUser(req.body);
  res.status(201).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  validateUserPayload(req.body);

  const existingUser = await usersService.getUserById(id);
  if (!existingUser) {
    throw new HttpError(404, "Utente non trovato.");
  }

  const updatedUser = await usersService.updateUser(id, req.body);
  res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const deleted = await usersService.deleteUser(parseId(req.params.id));

  if (!deleted) {
    throw new HttpError(404, "Utente non trovato.");
  }

  res.status(204).send();
});

module.exports = {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser
};
