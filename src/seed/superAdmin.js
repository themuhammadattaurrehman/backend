const bcrypt = require("bcrypt");
const { User, Tenant } = require("../models");

async function seedSuperAdmin() {
  try {
    // check if default tenant exists
    let tenant = await Tenant.findOne({ where: { name: "Default Org" } });
    if (!tenant) {
      tenant = await Tenant.create({
        name: "Default Org",
        description: "Default organization tenant",
      });
      console.log("✅ Tenant created:", tenant.name);
    }

    // check if super admin exists
    let superAdmin = await User.findOne({ where: { email: "superadmin@test.com", role: "SuperAdmin" } });
    if (!superAdmin) {
      const hashedPassword = await bcrypt.hash("123456", 10);
      superAdmin = await User.create({
        name: "Super Admin",
        email: "superadmin@test.com",
        password: hashedPassword,
        role: "SuperAdmin",
        TenantId: tenant.id,
        approved: true,
      });
      console.log("✅ SuperAdmin created:", superAdmin.email);
    }
  } catch (err) {
    console.error("❌ Seeder error:", err.message);
  }
}

module.exports = seedSuperAdmin;
