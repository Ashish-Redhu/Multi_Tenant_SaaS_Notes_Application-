const express = require('express');
const app = express();
const PORT = 4000;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("./models/userModel");
const noteRoutes = require("./routes/noteRoutes");
const tenancyRoutes = require("./routes/tenancyRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json()); // Middleware to handle JSON request bodies.
require('dotenv').config();

app.get('/', (req, res)=>{
    res.send("Hi, this is home page");
});
app.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"});
        }
        
        const secretKey = process.env.JWT_SECRET; // get key from .env
        const token = jwt.sign({userId: user._id}, secretKey, {expiresIn: "1h"});
        res.json({token});
    }
    catch(err){
        res.status(500).json({message: `Server error occured: ${err.message}`});
    }
})
app.use("/notes", noteRoutes);
app.use("/tenants", tenancyRoutes);
app.use("/users", userRoutes);

app.get("/health", (req, res)=>{
    res.json({status: "ok"});
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});