import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { BadRequestError } from "../errors/errors.js";
import { UnauthenticatedError } from "../errors/errors.js";

//Desc Register New User
//Route /api/users (POST)
//Access Public
const registerUser = async(req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError("Please Add All Fields");
    }
    //Check User Exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new UnauthenticatedError("User Already Exists");
    }

    //Create User
    const user = await User.create({
        name,
        email,
        password,
    });

    //Generate Token
    const Token = user.generateToken();

    if (user) {
        res.status(StatusCodes.CREATED).json({
            token: Token,
        });
    } else {
        throw new BadRequestError("Invalid User Data");
    }
};

//Desc Authenticate New User
//Route /api/users/login (POST)
//Access Public
const loginUser = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please Provide Email and Password");
    }
    //Check for User Email
    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);

    if (user && isPasswordCorrect) {
        //Generate Token
        const Token = user.generateToken();

        res.status(StatusCodes.OK).json({
            token: Token,
        });
    } else {
        throw new UnauthenticatedError("Invalid Credentials");
    }
};
//Desc   GET User data
//Route /api/users/me (GET)
//Access Private
const getMe = async(req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(StatusCodes.OK).json({
        id: _id,
        name,
        email,
    });
};

export { registerUser, loginUser, getMe };