const HttpError = require("./http-error");

const parseId = (id) => {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new HttpError(400, "ID non valido.");
  }

  return parsedId;
};

module.exports = parseId;
