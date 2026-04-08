const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: "Risorsa non trovata."
  });
};

// Express riconosce questo come error middleware solo se la firma ha 4 parametri
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
