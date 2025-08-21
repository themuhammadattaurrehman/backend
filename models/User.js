const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { 
    type: DataTypes.ENUM("SuperAdmin", "Admin", "Manager", "User"),
    defaultValue: "User"
  },
  approved: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = User;
