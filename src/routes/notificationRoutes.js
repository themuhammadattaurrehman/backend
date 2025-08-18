const express = require("express");
const auth = require("../middleware/auth");
const { create, getAll } = require("../controllers/notificationController");

const router = express.Router();

router.post("/add", auth, create);
router.get("/", auth, getAll);

module.exports = router;

