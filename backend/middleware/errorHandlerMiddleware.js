import { CustomAPIError } from "../errors/errors.js";
import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleWare = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({
            msg: err.message,
            stack: process.env.NODE_ENV === "production" ? null : err.stack,
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: "Something went wrong please try again",
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

export default errorHandlerMiddleWare;