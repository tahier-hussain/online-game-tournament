//Model
const User = require("../models/user");

exports.get = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.reduceBalance = (req, res) => {
  User.findById(req.user.id).then(user => {
    let obj = {
      account_balance: user.account_balance - req.body.amount
    };
    User.findByIdAndUpdate(req.user.id, obj)
      .then(data => res.json(data))
      .catch(() => res.status(400).json({ msg: "Something went wrong" }));
  });
};

exports.refundBalance = (req, res) => {
  User.findById(req.user.id).then(user => {
    let obj = {
      account_balance: user.account_balance + (req.body.amount * 80) / 100
    };
    User.findByIdAndUpdate(req.user.id, obj)
      .then(data => res.json(data))
      .catch(() => res.status(400).json({ msg: "Something went wrong" }));
  });
};
