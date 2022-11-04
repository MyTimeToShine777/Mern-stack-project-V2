import { StatusCodes } from "http-status-codes";
import Goal from "../models/goalModel.js";
import User from "../models/userModel.js";
import { BadRequestError } from "../errors/errors.js";
import { NotFoundError } from "../errors/errors.js";
import { UnauthenicatedError } from "../errors/errors.js";

//Desc Get All Goals
//Route /api/v1/goals (GET)
//Access Private
const getGoals = async(req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(StatusCodes.OK).json({ nbHits: goals.length, goals });
};
//Desc Set Goals
//Route /api/v1/goals (POST)
//Access Private
const setGoals = async(req, res) => {
    if (!req.body.text) {
        throw new BadRequestError("Please Add Text Field");
    }
    const setGoal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    });
    res.status(StatusCodes.CREATED).json(setGoal);
};
//Desc Get Single Goals
//Route /api/v1/goals/:id (GET)
//Access Private
const getSingleGoals = async(req, res) => {
    const { id } = req.params;
    const goal = await Goal.findById(id);
    if (!goal) {
        throw new NotFoundError(`No Goal with ID: ${id}`);
    }
    res.status(StatusCodes.OK).json(goal);
};
//Desc Put Single Goals
//Route /api/v1/goals/:id (PUT)
//Access Private
const updateGoals = async(req, res) => {
    const { id } = req.params;
    const data = req.body;
    const goal = await Goal.findById(id);
    if (!goal) {
        throw new NotFoundError("Goal Not Found");
    }

    //Check for login user
    if (!req.user) {
        throw new UnauthenicatedError("User Not Found");
    }
    //Make Sure the Logged in user Matches the Goal User
    if (goal.user.toString() !== req.user.id) {
        throw new UnauthenicatedError("User Not Authorized");
    }
    const updatedGoal = await Goal.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!updatedGoal) {
        throw new NotFoundError(`No Goal with ID: ${id}`);
    }
    res.status(StatusCodes.OK).json(updatedGoal);
};
//Desc Delete Single Goals
//Route /api/v1/goals/:id (DELETE)
//Access Private
const deleteGoals = async(req, res) => {
    const { id } = req.params;
    const goal = await Goal.findById(id);
    if (!goal) {
        throw new NotFoundError("Goal Not Found");
    }

    //Check for login user
    if (!req.user) {
        throw new UnauthenicatedError("User Not Found");
    }
    //Make Sure the Logged in user Matches the Goal User
    if (goal.user.toString() !== req.user.id) {
        throw new UnauthenicatedError("User Not Authorized");
    }

    const deletedGoal = await Goal.findByIdAndDelete(id);
    if (!deletedGoal) {
        throw new NotFoundError(`No Goal with ID: ${id}`);
    }
    await goal.remove();
    res.status(StatusCodes.OK).json({ id: id });
};

export { getGoals, getSingleGoals, setGoals, updateGoals, deleteGoals };