import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { BadRequestError } from "../errors/errors.js";

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
        throw new BadRequestError("User Already Exists");
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    const payload = {
        id: user._id,
        name: user.name,
    };

    if (user) {
        res.status(StatusCodes.CREATED).json({
            token: generateToken(payload),
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
    //Check for User Email
    const user = await User.findOne({ email });
    const payload = {
        id: user._id,
        name: user.name,
    };

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(StatusCodes.OK).json({
            token: generateToken(payload),
        });
    } else {
        throw new BadRequestError("Invalid Credentials");
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

//Generate JWT

const generateToken = (payload) => {
    return jwt.sign({ id: payload.id, name: payload.name },
        process.env.JWT_SECRET, {
            expiresIn: "30d",
        }
    );
};

export { registerUser, loginUser, getMe };