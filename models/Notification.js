const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Notification = sequelize.define("Notification", {
  message: { type: DataTypes.STRING, allowNull: false },
  TenantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
});

module.exports = Notification;
