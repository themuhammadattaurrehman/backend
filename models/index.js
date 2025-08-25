const User = require("./User");
const Tenant = require("./Tenant");
const Notification = require("./Notification");

Tenant.hasMany(User);
User.belongsTo(Tenant);

Tenant.hasMany(Notification);
Notification.belongsTo(Tenant);

module.exports = { User, Tenant, Notification };
