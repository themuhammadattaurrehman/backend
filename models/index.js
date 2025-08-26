const User = require("./User");
const Tenant = require("./Tenant");
const Notification = require("./Notification");

Tenant.hasMany(User, { foreignKey: "TenantId" });
User.belongsTo(Tenant, { foreignKey: "TenantId" });

Tenant.hasMany(Notification);
Notification.belongsTo(Tenant);

module.exports = { User, Tenant, Notification };
