const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            tenancy: req.user.tenancy
        });

        await newUser.save();
        const usersInTenant = await UserModel.find({tenancy: req.user.tenancy}).select("_id");
        res.status(201).json({
            message: "User created successfully",
            data: {
                user: newUser,
                usersCount: usersInTenant.length
            }
        });
    } catch (error) {
        res.status(500).json({ message: `HELLO: ${error.message}` });
    }
};


// exports.getAllUsers = async(req, res)=>{
//     try{
//         const usersInTenant = await UserModel.find({tenancy: req.user.tenancy}).select("_id");
//         res.json({
//             usersCount: usersInTenant.length
//         });
//     }
//     catch(err){
//         res.status(500).json({message: `Error while fetching all users: ${err.message}`});
//     }
// }
