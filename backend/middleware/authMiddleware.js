import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { UnauthenticatedError } from "../errors/errors.js";

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
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            console.log(error);
            throw new UnauthenticatedError("Not Authorized");
        }
    }
    if (!token) {
        throw new UnauthenticatedError("Not Authorized, No Token");
    }
};

export default protectRoute;