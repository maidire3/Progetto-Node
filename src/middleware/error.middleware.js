const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: "Risorsa non trovata."
  });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Errore interno del server."
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};
