import CustomAPIError from "./custom-error.js";
import { StatusCodes } from "http-status-codes";

class UnauthenicatedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default UnauthenicatedError;