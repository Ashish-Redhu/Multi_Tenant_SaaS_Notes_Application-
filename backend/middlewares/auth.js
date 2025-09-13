const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const userModel = require("../models/userModel");

async function verifyToken(req, res, next){
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    try{
        const decoded = jwt.verify(token, secretKey); // If token not verified, it will go to catch. 
        const user = await userModel.findById(decoded.userId).select("-password"); // Excluded password even for other routes or backend. 
        if(!user){
            return res.status(401).json({message: "User not found"});
        }
        req.user = user;
        next();
    }
    catch(err){
        res.status(401).json({message: "Invalid or expired token"});
    }
}

module.exports = verifyToken;
