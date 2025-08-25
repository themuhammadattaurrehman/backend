const { Notification } = require("../models");

// exports.create = async (req, res) => {
//   const notification = await Notification.create({
//     message: req.body.message,
//     UserId: req.user.id
//   });
//   res.json(notification);
// };

// exports.getAll = async (req, res) => {
//   const notifications = await Notification.findAll({ where: { UserId: req.user.id } });
//   res.json(notifications);
// };

exports.create = async (req, res) => {
  try {
    const notification = await Notification.create({
      message: req.body.message,
      TenantId: req.body.tenantId   // 👈 instead of UserId
    });

    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: "Failed to create notification", details: err });
  }
};

exports.getAll = async (req, res) => {
  try {
    const tenantId = req.params.tenantId; // or req.query.tenantId

    const notifications = await Notification.findAll({
      where: { TenantId: tenantId },
      order: [["createdAt", "DESC"]]
    });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications", details: err });
  }
};
