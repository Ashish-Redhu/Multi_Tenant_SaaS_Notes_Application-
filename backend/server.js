const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const UserModel = require("./models/userModel");
const TenancyModel = require("./models/tenancyModel");
const noteRoutes = require("./routes/noteRoutes");
const tenancyRoutes = require("./routes/tenancyRoutes");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");
const verifyToken = require("./middlewares/auth");

app.use(express.json()); // Middleware to handle JSON request bodies.
app.use(cookieParser()); // Add this middleware
require('dotenv').config();
app.use(cors({
  origin: process.env.FRONTEND_URI, // frontend origin
  credentials: true // allow cookies to be sent
}));


const PORT = process.env.PORT || 4000;

app.get('/', (req, res)=>{
    res.send("Hi, this is home page");
});
app.post('/login', async (req, res)=>{
    const {email, password} = req.body;

    try{
        const user = await UserModel.findOne({email}).populate("tenancy", "tenancyName plan");
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"});
        }

        const secretKey = process.env.JWT_SECRET; // get key from .env
        const token = jwt.sign({userId: user._id}, secretKey, {expiresIn: "1h"});

        // Set token in HTTP-only cookie
        res.cookie('authToken', token, {
            httpOnly: true,   // Cannot be accessed by JavaScript
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            sameSite: 'none',
            maxAge: 3600000   // 1 hour
        });

        // Exclude password before sending response
        const userData = user.toObject(); // Convert to plain JS object
        delete userData.password; // Remove password field

        res.json({ message: "Login successful", user: userData});
    }
    catch(err){
        res.status(500).json({message: `Server error occured: ${err.message}`});
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('authToken');
    res.json({ message: "Logged out successfully" });
});

app.use("/notes", noteRoutes);
app.use("/tenants", tenancyRoutes);
app.use("/users", userRoutes);

app.get("/health", (req, res)=>{
    res.json({status: "ok"});
});

// Protected route example
app.get("/auth", verifyToken, (req, res) => {
    res.json({ message: "Authenticated successfully", user: req.user });
});

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully.");
    }
    catch(error){
        console.error(`Error connection to MongoDB, ${error.message}`);
        process.exit(1); // exit process with failure. 
    }
}
connectDB();

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});