import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { UnauthenicatedError } from "../errors/errors.js";

const protectRoute = async(req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //Get token from header
            token = req.headers.authorization.split(" ")[1];

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //Get user from the token
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.log(error);
            throw new UnauthenicatedError("Not Authorized");
        }
    }
    if (!token) {
        throw new UnauthenicatedError("Not Authorized, No Token");
    }
};

export default protectRoute;