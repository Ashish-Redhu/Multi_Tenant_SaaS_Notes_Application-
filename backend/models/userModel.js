const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userType: {type: String, enum: ["admin", "member"], default: "member"},
    tenancy: {type: mongoose.Schema.Types.ObjectId, ref: "TenancyModel", required: true},
});

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
