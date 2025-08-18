const User = require("./User");
const Tenant = require("./Tenant");
const Notification = require("./Notification");

Tenant.hasMany(User);
User.belongsTo(Tenant);

User.hasMany(Notification);
Notification.belongsTo(User);

module.exports = { User, Tenant, Notification };
