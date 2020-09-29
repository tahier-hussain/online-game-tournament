const express = require("express");
const router = express.Router();
const participateTournamentController = require("../../controllers/participate-tournament");
const auth = require("../../middleware/auth");

router.post("/add", auth, participateTournamentController.create);

router.get("/upcoming-online-tournaments", auth, participateTournamentController.upcomingOnlineTournaments);

router.get("/upcoming-offline-tournaments", auth, participateTournamentController.upcomingOfflineTournaments);

router.post("/participants", auth, participateTournamentController.participants);

router.put("/update", auth, participateTournamentController.update);

router.post("/delete", auth, participateTournamentController.delete);

module.exports = router;
