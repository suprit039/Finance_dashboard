const router = require("express").Router();

const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const validate = require("../middleware/validation.middleware");

const { updateUserSchema } = require("../validators/user.validator");

// Only ADMIN can manage users
router.use(auth, role("ADMIN"));

router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.put(
  "/:id",
  validate(updateUserSchema),
  userController.updateUser
);

module.exports = router;