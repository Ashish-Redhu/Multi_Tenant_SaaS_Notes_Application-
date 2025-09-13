const express = require("express");
const router = express.Router();

// middlewares. 
const verifyToken = require("../middlewares/auth");
const adminCheck = require("../middlewares/adminCheck");

// controller. 
const { upgradeTenancy } = require("../controllers/tenancyController");

router.post("/:slug/upgrade", verifyToken, adminCheck, upgradeTenancy);

module.exports = router;