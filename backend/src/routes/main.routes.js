const router = require("express").Router();

router.use("/users", require("./partials/user.routes"));
router.use("/pictures", require("./partials/picture.routes"));

module.exports = router;
