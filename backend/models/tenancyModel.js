const mongoose = require("mongoose");

const tenancySchema = new mongoose.Schema({
    tenancyName: {type: String, required: true, unique: true},
    plan: {type: String, enum: ["free", "pro"], default: "free"},
})

const TenancyModel = mongoose.model("TenancyModel", tenancySchema);
module.exports = TenancyModel;