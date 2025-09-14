const express = require("express");
const router = express.Router();

// middlewares. 
const verifyToken = require("../middlewares/auth");
const adminCheck = require("../middlewares/adminCheck");

// controller. 
const { createUser, getAllUsers } = require("../controllers/userController");

router.post("/create", verifyToken, adminCheck, createUser);
// router.get("/", verifyToken, getAllUsers);
module.exports = router;