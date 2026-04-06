const router = require("express").Router();

const recordController = require("../controllers/record.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const cache = require("../middleware/cache.middleware");
const validate = require("../middleware/validation.middleware");

const {
  createRecordSchema,
  updateRecordSchema,
  querySchema,
} = require("../validators/record.validator");

// All routes require login
router.use(auth);

// Create (Admin only)
router.post(
  "/",
  role("ADMIN"),
  validate(createRecordSchema),
  recordController.createRecord
);

// Read (Admin + Analyst)
router.get(
  "/",
  role("ADMIN", "ANALYST"),
  validate(querySchema, "query"),
  cache(300),
  recordController.getRecords
);

// Update (Admin only)
router.put(
  "/:id",
  role("ADMIN"),
  validate(updateRecordSchema),
  recordController.updateRecord
);

// Delete (Admin only)
router.delete("/:id", role("ADMIN"), recordController.deleteRecord);

module.exports = router;