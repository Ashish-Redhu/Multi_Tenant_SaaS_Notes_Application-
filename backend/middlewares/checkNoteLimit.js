// middlewares/checkNoteLimit.js
const NoteModel = require("../models/noteModel");
const UserModel = require("../models/userModel");
const TenancyModel = require("../models/tenancyModel");

const checkNoteLimit = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Get tenancy of current user
        const tenancy = await TenancyModel.findById(req.user.tenancy);
        if (!tenancy) {
            return res.status(400).json({ message: "Tenancy not found" });
        }

        // If pro plan, we offer unlimited notes. 
        if (tenancy.plan === "pro") {
            return next();
        }
       
        // find users in the same tenancy --> find notes of each user. 
        const usersInTenant = await UserModel.find({ tenancy: tenancy._id }).select("_id");
        const userIds = usersInTenant.map(u => u._id);

        const noteCount = await NoteModel.countDocuments({ author: { $in: userIds } });

        if (noteCount >= 3) {
            return res.status(403).json({ message: "Free plan note limit reached" });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = checkNoteLimit;
