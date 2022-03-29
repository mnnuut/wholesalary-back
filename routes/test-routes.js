const express = require("express");
const {
  getTests,
  getTest,
  getTests2,
  addTest,
  updateTest,
  deleteTest,
} = require("../controllers/testController");

const router = express.Router();

router.post("/add-test", addTest);
router.get("/tests", getTests);
router.get("/test2", getTests2);
router.get("/test/:id", getTest);
router.put("/update-test/:id", updateTest);
router.delete("/delete-test/:id", deleteTest);

module.exports = {
  routes: router,
};
