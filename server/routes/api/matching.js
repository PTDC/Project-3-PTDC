const router = require("express").Router();
const profileController = require("../../controllers/profileController");

router
  .route("/:verb")
  .get(profileController.findByVerb);

module.exports = router;