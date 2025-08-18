const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Tenant = sequelize.define("Tenant", {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

module.exports = Tenant;
