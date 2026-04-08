require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db"); // funzione che connette al DB

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(); // test connessione DB

    app.listen(PORT, () => {
      console.log(`Tongue API in ascolto sulla porta ${PORT}`);
    });

  } catch (error) {
    console.error("Errore connessione al database:", error.message);
    process.exit(1); // termina il processo
  }
};

startServer();