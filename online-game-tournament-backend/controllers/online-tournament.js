//Model
const Admin = require("../models/admin");
const OnlineTournament = require("../models/online-tournament");

exports.create = (req, res) => {
  let file;
  if (req.files.file) {
    file = req.files.file;
    console.log(file.data);
    file.mv(`/home/tahier/Codingmart-tasks/online-game-tournament/online-game-tournament-frontend/client/public/${file.name}`);
  }

  Admin.findById(req.user.id)
    .select("-password")
    .then(admin => {
      const newOnlineTournament = new OnlineTournament({
        title: req.body.title,
        description: req.body.description,
        entry_fee: req.body.entry_fee,
        no_of_slots: req.body.no_of_slots,
        no_of_slots_available: req.body.no_of_slots,
        image: file.name,
        event_date: req.body.event_date
      });

      newOnlineTournament
        .save()
        .then(data => res.json(data))
        .catch(() =>
          res.status(400).json({
            msg: "Something went wrong"
          })
        );
    });
};

exports.get = (req, res) => {
  OnlineTournament.find()
    .sort({ register_date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getOne = (req, res) => {
  OnlineTournament.findById(req.body.id)
    .then(tournament => res.json(tournament))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getUserPost = (req, res) => {
  Admin.findById(req.user.id).then(user => {
    OnlineTournament.find({ auth_id: user.id })
      .sort({ register_date: -1 })
      .then(posts => res.json(posts))
      .catch(() => res.status(400).json({ msg: "Something went wrong" }));
  });
};

exports.getUpcomingTwoTournaments = async (req, res) => {
  let today = new Date();
  let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let result = [];
  let index = 0;
  let tournaments = await OnlineTournament.find()
    .sort({ event_date: 1 })
    .then(async data => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].event_date);
        console.log(date);
        if (await (parseInt(data[i].event_date.substring(0, 4)) == today.getFullYear())) {
          if (await (parseInt(data[i].event_date.substring(5, 7)) == today.getMonth() + 1)) {
            if (await (parseInt(data[i].event_date.substring(8, 10)) >= today.getDate())) {
              result[index++] = data[i];
            }
          } else if (await (parseInt(data[i].event_date.substring(5, 7)) > today.getMonth() + 1)) {
            result[index++] = data[i];
          }
        } else if (await (parseInt(data[i].event_date.substring(0, 4)) > today.getFullYear())) {
          result[index++] = data[i];
        }
        if (await (index == 2)) {
          break;
        }
      }
      console.log(result);
      return result;
    });
  res.json(tournaments.slice(0, 2));
};

exports.getUpcomingTournaments = async (req, res) => {
  let today = new Date();
  let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let result = [];
  let index = 0;
  let tournaments = await OnlineTournament.find()
    .sort({ event_date: 1 })
    .then(async data => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].event_date);
        console.log(date);
        if (await (parseInt(data[i].event_date.substring(0, 4)) == today.getFullYear())) {
          if (await (parseInt(data[i].event_date.substring(5, 7)) == today.getMonth() + 1)) {
            if (await (parseInt(data[i].event_date.substring(8, 10)) >= today.getDate())) {
              result[index++] = data[i];
            }
          } else if (await (parseInt(data[i].event_date.substring(5, 7)) > today.getMonth() + 1)) {
            result[index++] = data[i];
          }
        } else if (await (parseInt(data[i].event_date.substring(0, 4)) > today.getFullYear())) {
          result[index++] = data[i];
        }
        if (await (index == 2)) {
          break;
        }
      }
      console.log(result);
      return result;
    });
  res.json(tournaments);
};

exports.getPastTwoTournaments = async (req, res) => {
  let today = new Date();
  let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let result = [];
  let index = 0;
  let tournaments = await OnlineTournament.find()
    .sort({ event_date: -1 })
    .then(async data => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].event_date);
        console.log(date);
        if (await (parseInt(data[i].event_date.substring(0, 4)) == today.getFullYear())) {
          if (await (parseInt(data[i].event_date.substring(5, 7)) == today.getMonth() + 1)) {
            if (await (parseInt(data[i].event_date.substring(8, 10)) < today.getDate())) {
              result[index++] = data[i];
            }
          } else if (await (parseInt(data[i].event_date.substring(5, 7)) < today.getMonth() + 1)) {
            result[index++] = data[i];
          }
        } else if (await (parseInt(data[i].event_date.substring(0, 4)) < today.getFullYear())) {
          result[index++] = data[i];
        }
        if (await (index == 2)) {
          break;
        }
      }
      console.log(result);
      return result;
    });
  res.json(tournaments.slice(0, 2));
};

exports.getPastTournaments = async (req, res) => {
  let today = new Date();
  let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let result = [];
  let index = 0;
  let tournaments = await OnlineTournament.find()
    .sort({ event_date: -1 })
    .then(async data => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].event_date);
        console.log(date);
        if (await (parseInt(data[i].event_date.substring(0, 4)) == today.getFullYear())) {
          if (await (parseInt(data[i].event_date.substring(5, 7)) == today.getMonth() + 1)) {
            if (await (parseInt(data[i].event_date.substring(8, 10)) < today.getDate())) {
              result[index++] = data[i];
            }
          } else if (await (parseInt(data[i].event_date.substring(5, 7)) < today.getMonth() + 1)) {
            result[index++] = data[i];
          }
        } else if (await (parseInt(data[i].event_date.substring(0, 4)) < today.getFullYear())) {
          result[index++] = data[i];
        }
        if (await (index == 2)) {
          break;
        }
      }
      console.log(result);
      return result;
    });
  res.json(tournaments);
};

exports.update = (req, res) => {
  Admin.findById(req.user.id)
    .select("-password")
    .then(user => {
      OnlineTournament.find({ auth_id: req.user.id })
        .then(() => {
          OnlineTournament.findByIdAndUpdate(req.body.id, req.body)
            .then(post => res.json(post))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};

exports.delete = (req, res) => {
  Admin.findById(req.user.id)
    .select("-password")
    .then(user => {
      OnlineTournament.findByIdAndDelete(req.body.id)
        .then(post => res.json(post))
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};
