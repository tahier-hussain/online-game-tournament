const express = require("express");
const router = express.Router();
const onlineTournamentController = require("../../controllers/online-tournament");
const auth = require("../../middleware/auth");

router.post("/add", auth, onlineTournamentController.create);

router.get("/get", onlineTournamentController.get);

router.post("/get-one", auth, onlineTournamentController.getOne);

router.get("/get-nearby-tournament", auth, onlineTournamentController.getUserPost);

router.get("/get-upcoming-two-tournaments", onlineTournamentController.getUpcomingTwoTournaments);

router.get("/get-upcoming-tournaments", onlineTournamentController.getUpcomingTournaments);

router.get("/get-past-two-tournaments", onlineTournamentController.getPastTwoTournaments);

router.get("/get-past-tournaments", onlineTournamentController.getPastTournaments);

router.put("/update", auth, onlineTournamentController.update);

router.post("/delete", auth, onlineTournamentController.delete);

module.exports = router;
