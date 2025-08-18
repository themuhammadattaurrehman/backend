const express = require("express");
const {
  createTenant,
  getTenants,
  getTenantById,
  updateTenant,
  deleteTenant
} = require("../controllers/tenantController");

const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

const router = express.Router();

// Only SuperAdmin can manage Tenants
router.post("/add", auth, roleCheck(["SuperAdmin"]), createTenant);
router.get("/", getTenants);
router.get("/:id", auth, roleCheck(["SuperAdmin"]), getTenantById);
router.put("/:id", auth, roleCheck(["SuperAdmin"]), updateTenant);
router.delete("/:id", auth, roleCheck(["SuperAdmin"]), deleteTenant);

module.exports = router;
