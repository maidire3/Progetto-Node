const HttpError = require("./http-error");

const allowedInteractionTypes = ["like", "comment"];

const isValidDateTime = (value) => !Number.isNaN(Date.parse(value));

const validatePostPayload = (payload) => {
  if (!payload.title || typeof payload.title !== "string" || !payload.title.trim()) {
    throw new HttpError(400, "Il campo title e' obbligatorio.");
  }

  if (!payload.publishedAt || !isValidDateTime(payload.publishedAt)) {
    throw new HttpError(400, "Il campo publishedAt deve essere una data valida.");
  }
};

const validateUserPayload = (payload) => {
  if (!payload.nickname || typeof payload.nickname !== "string" || !payload.nickname.trim()) {
    throw new HttpError(400, "Il campo nickname e' obbligatorio.");
  }

  if (!Number.isInteger(payload.age) || payload.age < 0) {
    throw new HttpError(400, "Il campo age deve essere un numero intero maggiore o uguale a 0.");
  }

  if (!payload.city || typeof payload.city !== "string" || !payload.city.trim()) {
    throw new HttpError(400, "Il campo city e' obbligatorio.");
  }
};

const validateInteractionPayload = (payload) => {
  if (!Number.isInteger(payload.postId) || payload.postId <= 0) {
    throw new HttpError(400, "Il campo postId deve essere un intero positivo.");
  }

  if (!Number.isInteger(payload.userId) || payload.userId <= 0) {
    throw new HttpError(400, "Il campo userId deve essere un intero positivo.");
  }

  if (!allowedInteractionTypes.includes(payload.interactionType)) {
    throw new HttpError(400, "interactionType deve essere like oppure comment.");
  }

  if (!payload.interactionTime || !isValidDateTime(payload.interactionTime)) {
    throw new HttpError(400, "Il campo interactionTime deve essere una data valida.");
  }
};

module.exports = {
  allowedInteractionTypes,
  isValidDateTime,
  validateInteractionPayload,
  validatePostPayload,
  validateUserPayload
};
