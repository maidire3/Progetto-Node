const express = require("express");

const interactionsController = require("../controllers/interactions.controller");

const router = express.Router();

router.get("/", interactionsController.listInteractions);
router.get("/:id", interactionsController.getInteraction);
router.post("/", interactionsController.createInteraction);
router.put("/:id", interactionsController.updateInteraction);
router.delete("/:id", interactionsController.deleteInteraction);

module.exports = router;
