const express = require("express");
const router = express.Router();
const offlineTournamentController = require("../../controllers/offline-tournament");
const auth = require("../../middleware/auth");

router.post("/add", auth, offlineTournamentController.create);

router.get("/get", offlineTournamentController.get);

router.post("/get-one", auth, offlineTournamentController.getOne);

router.get("/get-upcoming-two-tournaments", offlineTournamentController.getUpcomingTwoTournaments);

router.get("/get-upcoming-tournaments", offlineTournamentController.getUpcomingTournaments);

router.get("/get-past-two-tournaments", offlineTournamentController.getPastTwoTournaments);

router.get("/get-past-tournaments", offlineTournamentController.getPastTournaments);

router.get("/get-nearby-tournament", auth, offlineTournamentController.getUserPost);

router.put("/update", auth, offlineTournamentController.update);

router.post("/delete", auth, offlineTournamentController.delete);

module.exports = router;
