const express = require("express");
const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/adduser", addUser);
router.get("/user", getUsers);
router.get("/oneuser/:id", getUser);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);

module.exports = {
  routes: router,
};
