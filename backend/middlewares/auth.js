const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

async function verifyToken(req, res, next) {
    // Read token from cookies
    const token = req.cookies?.authToken;
    if (!token) { return res.status(401).json({ message: "No token provided" }); }
    try {
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey); // Throws error if invalid or expired

        const user = await userModel.findById(decoded.userId).select("-password").populate("tenancy");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user; // Attach user to request
        next();
    } catch (err) {
         console.log('auth6');
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = verifyToken;
