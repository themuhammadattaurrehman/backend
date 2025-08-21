const { Tenant, User } = require("../models");

// ✅ Create Tenant
exports.createTenant = async (req, res) => {
  try {
    const { name } = req.body;

    const tenant = await Tenant.create({ name });
    res.status(201).json({ message: "Tenant created successfully", tenant });
  } catch (error) {
    res.status(500).json({ message: "Error creating tenant", error: error.message });
  }
};

// ✅ Get All Tenants
exports.getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.findAll({
      include: [{ model: User, attributes: ["id", "name", "email", "role"] }]
    });
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tenants", error: error.message });
  }
};

// ✅ Get Tenant by ID
exports.getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["id", "name", "email", "role"] }]
    });

    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    res.json(tenant);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tenant", error: error.message });
  }
};

// ✅ Update Tenant
exports.updateTenant = async (req, res) => {
  try {
    const { name } = req.body;

    const tenant = await Tenant.findByPk(req.params.id);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    tenant.name = name || tenant.name;
    await tenant.save();

    res.json({ message: "Tenant updated successfully", tenant });
  } catch (error) {
    res.status(500).json({ message: "Error updating tenant", error: error.message });
  }
};

// ✅ Delete Tenant
exports.deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByPk(req.params.id);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    await tenant.destroy();
    res.json({ message: "Tenant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tenant", error: error.message });
  }
};
