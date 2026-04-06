const router = require("express").Router();

const dashboardController = require("../controllers/dashboard.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const cache = require("../middleware/cache.middleware");

// Viewer, Analyst, Admin can access dashboard
router.use(auth);

router.get(
  "/summary",
  role("ADMIN", "ANALYST", "VIEWER"),
  cache(300),
  dashboardController.getSummary
);

router.get(
  "/category",
  role("ADMIN", "ANALYST"),
  cache(300),
  dashboardController.getCategoryWise
);

router.get(
  "/recent",
  role("ADMIN", "ANALYST"),
  cache(300),
  dashboardController.getRecent
);

module.exports = router;