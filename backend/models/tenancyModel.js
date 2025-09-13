const mongoose = require("mongoose");

const tenancySchema = new mongoose.Schema({
    tenancyName: String,
    plan: {type: String, enum: ["free", "pro"], default: "free"},
})

const TenancyModel = mongoose.model("TenancyModel", tenancySchema);
module.exports = TenancyModel;