const { User } = require("../models");

// ✅ Single API for approving/unapproving a user
exports.setApprovalStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { approved } = req.body; // true or false from frontend

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.approved = approved;
    await user.save();

    res.json({
      message: `User ${approved ? "approved" : "unapproved"} successfully`,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// const { User } = require("../models");

// ✅ SuperAdmin → Get all Admins
exports.getAdmins = async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const admins = await User.findAll({ where: { role: "Admin" } });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error: error.message });
  }
};

// ✅ Admin → Get Managers & Users (from same Tenant)
exports.getTenantUsers = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.findAll({
      where: {
        TenantId: req.user.tenantId, // only same tenant
        role: ["Manager", "User"]   // restrict to these roles
      }
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tenant users", error: error.message });
  }
};

// ✅ Manager/User → Optional (fetch own profile only)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role", "approved", "TenantId"]
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

exports.getManagersAndUsers = async (req, res) => {
  try {
    if (req.user.role !== "Manager" && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const managers = await User.findAll({ where: { role: "Manager" } });
    const users = await User.findAll({ where: { role: "User" } });

    // Merge both arrays into one
    const allData = [...managers, ...users];

    res.json({ data: allData });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching managers and users",
      error: error.message,
    });
  }
};

