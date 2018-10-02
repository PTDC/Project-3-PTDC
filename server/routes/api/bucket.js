const router = require("express").Router();
const bucketController = require("../../controllers/bucketController");

router.route("/")
  .get(bucketController.findAll)
  .post(bucketController.create);

// Matches with "/api/bucket/:id"
router
  .route("/:id")
  .get(bucketController.findById)
  .put(bucketController.update)
  .delete(bucketController.remove);

module.exports = router;
