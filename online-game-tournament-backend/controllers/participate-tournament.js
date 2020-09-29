//Model
const User = require("../models/user");
const ParticipateTournament = require("../models/participated-tournament");
const OnlineTournament = require("../models/online-tournament");
const OfflineTournament = require("../models/offline-tournament");

exports.create = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(() => {
      const newParticipatedTournament = new ParticipateTournament({
        user_id: req.user.id,
        tournament_id: req.body.tournament_id,
        tournament_type: req.body.tournament_type
      });
      ParticipateTournament.find({ $and: [{ tournament_id: req.body.tournament_id }, { user_id: req.user.id }] }).then(data => {
        console.log(data);
        if (data.length > 0) {
          res.json({ msg: "Already participated" });
        } else {
          newParticipatedTournament
            .save()
            .then(data => res.json(data))
            .catch(() =>
              res.status(400).json({
                msg: "Something went wrong"
              })
            );
        }
      });
    });
};

exports.upcomingOnlineTournaments = (req, res) => {
  ParticipateTournament.find({ user_id: req.user.id }).then(async data => {
    let output = [];
    let index = 0;
    for (let i = 0; i < data.length; i++) {
      let val = await OnlineTournament.findById(data[i].tournament_id).then(tournament => {
        return tournament;
      });
      if (val) {
        output[index++] = val;
      }
    }
    await res.json(output);
  });
};

exports.upcomingOfflineTournaments = (req, res) => {
  ParticipateTournament.find({ user_id: req.user.id }).then(async data => {
    let output = [];
    let index = 0;
    for (let i = 0; i < data.length; i++) {
      let val = await OfflineTournament.findById(data[i].tournament_id).then(tournament => {
        return tournament;
      });
      if (val) {
        output[index++] = val;
      }
    }
    await res.json(output);
  });
};

exports.participants = (req, res) => {
  ParticipateTournament.find({ tournament_id: req.body.id }).then(async data => {
    let output = [];
    let index = 0;
    for (let i = 0; i < data.length; i++) {
      output[index++] = await User.findById(data[i].user_id).then(user => {
        return user;
      });
    }
    await res.json(output);
  });
};

exports.get = (req, res) => {
  OfflineTournament.find()
    .sort({ register_date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.update = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      OfflineTournament.find({ auth_id: req.user.id })
        .then(() => {
          OfflineTournament.findByIdAndUpdate(req.body.id, req.body)
            .then(post => res.json(post))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};

exports.delete = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      console.log(req.body.tournament_id);
      ParticipateTournament.find({ tournament_id: req.body.tournament_id })
        .then(data => {
          console.log(data);
          ParticipateTournament.findByIdAndDelete(data[0]._id)
            .then(tournament => res.json(tournament))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};
