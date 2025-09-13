const TenancyModel = require("../models/tenancyModel");

exports.upgradeTenancy = async (req, res) => {
    try {
        const { slug } = req.params; // assuming slug is tenancy ID or unique name

        const tenancy = await TenancyModel.findById(slug); // or findOne({ tenancyName: slug }) if using name
        if (!tenancy) {
            return res.status(404).json({ message: "Tenancy not found" });
        }

        if (tenancy.plan === "pro") {
            return res.status(400).json({ message: "Tenancy already on pro plan" });
        }

        tenancy.plan = "pro";
        await tenancy.save();

        res.json({ message: "Tenancy upgraded to pro plan", tenancy });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
