const express = require("express");
const { approveUser, unapproveUser,getAdmins,setApprovalStatus,
  getTenantUsers,getManagersAndUsers,
  getProfile } = require("../controllers/userController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

const router = express.Router();

// Only SuperAdmin or Admin can approve users
// router.put("/:userId/approve", auth, roleCheck(["SuperAdmin", "Admin"]), approveUser);
router.put("/:userId/approval", auth, roleCheck(["SuperAdmin", "Admin"]), setApprovalStatus);
router.get("/admins", auth, getAdmins);
router.get("/tenant-users", auth, getTenantUsers);
router.get("/profile", auth, getProfile);
router.get("/managers-users",auth,roleCheck(["Manager", "Admin"]),getManagersAndUsers);

module.exports = router;
