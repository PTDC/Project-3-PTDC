const router = require("express").Router();
const profileRoutes = require("./profile");
const bucketRoutes = require("./bucket");

// Profile routes
router.use("/profile", profileRoutes);
router.use("/bucket", bucketRoutes);

module.exports = router;
