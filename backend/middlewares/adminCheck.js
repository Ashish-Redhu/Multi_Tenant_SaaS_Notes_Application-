const adminCheck = (req, res, next)=>{
    if(!req.user){
        return res.status(401).json({message: "Unauthorized."});
    }
    if(req.user.userType !== "admin"){
        return res.status(403).json({message: "Admin access required"});
    }
    next();
}
module.exports = adminCheck;