const express = require("express");
const router = express.Router();

// middlewares. 
const verifyToken = require("../middlewares/auth");
const adminCheck = require("../middlewares/adminCheck");

// controller. 
const { createUser } = require("../controllers/userController");

router.post("/create", verifyToken, adminCheck, createUser);
module.exports = router;