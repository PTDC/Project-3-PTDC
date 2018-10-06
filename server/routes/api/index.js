const router = require("express").Router();
const profileRoutes = require("./profile");
const bucketRoutes = require("./bucket");
const matchingRoutes = require("./matching");

// Profile routes
router.use("/profile", profileRoutes);
router.use("/bucket", bucketRoutes);
router.use("/matching", matchingRoutes);

module.exports = router;
