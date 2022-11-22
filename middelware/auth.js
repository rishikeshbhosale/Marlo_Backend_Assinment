import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/user.model.js";

dotenv.config() 
const auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        console.log(authorization);
        if (authorization) {
            const token = authorization.replace("Bearer ", "")
        
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            console.log(decoded);
            const user =await User.findOne({_id:decoded._id})
            
            if(!user){
                return res.json("Please Login")
            }else{
                req.user=user;
                next();
            }

        } else {
            res.json({
                msg: "Not Authoriszed to view this page ABCD"
            })
        }

    } catch (e) {
        res.json({
            msg: "Not Authoriszed to view this page",
            error: e
        })
        console.log(e);
    }


}

export default auth;