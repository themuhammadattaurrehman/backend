const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("../config/db");
const seedSuperAdmin = require("../seed/superAdmin");

const authRoutes = require("../routes/authRoutes");
const notificationRoutes = require("../routes/notificationRoutes");
const tenantRoutes = require("../routes/tenantRoutes");
const userRoutes = require("../routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/users", userRoutes);

// ⚡ Important: Don't use app.listen in production (serverless)
if (process.env.NODE_ENV !== "production") {
  sequelize
    .sync({ alter: true })
    .then(async () => {
      console.log("✅ Database synced");
      await seedSuperAdmin();
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () =>
        console.log(`🚀 Server running locally on port ${PORT}`)
      );
    })
    .catch((err) => {
      console.error("❌ Database sync error:", err);
    });
}

module.exports = app;
