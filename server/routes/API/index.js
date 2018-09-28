const router = require("express").Router();
const profileRoutes = require("./profile");

// Book routes
router.use("/profile", profileRoutes);

module.exports = router;
