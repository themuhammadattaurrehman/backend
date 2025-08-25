const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { generateTokens } = require("../utils/token");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, TenantId } = req.body;
    const existingUser = await User.findOne({ where: { email, role } });
    if (existingUser) {
      return res.status(400).json({ 
        message: `User with email ${email} and role ${role} already exists.` 
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      TenantId,
      approved: false
    });
    res.json({ 
      message: "User registered successfully. Awaiting approval.", 
      user 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



exports.login = async (req, res) => {
  const { role,email, password } = req.body;
  const user = await User.findOne({ where: { email, role } });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!user.approved) {
    return res.status(403).json({ message: "Your account is not approved yet." });
  }

  const tokens = generateTokens(user);
  res.json({ user, ...tokens });
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role, tenantId: decoded.tenantId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // short expiry
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};


