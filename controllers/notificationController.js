const { Notification } = require("../models");

exports.create = async (req, res) => {
  const notification = await Notification.create({
    message: req.body.message,
    UserId: req.user.id
  });
  res.json(notification);
};

exports.getAll = async (req, res) => {
  const notifications = await Notification.findAll({ where: { UserId: req.user.id } });
  res.json(notifications);
};
