import axios from "axios";

const API_URL = "/api/v1/goals";
const API_URL_DELETE = "/api/v1/goals/";

//Create new goal

const createGoal = async(goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, goalData, config);

    return response.data;
};

//Get User Goals

const getGoals = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data.goals;
};

//Delete User Goal
const deleteGoal = async(goalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL_DELETE + goalId, config);

    return response.data;
};

const goalService = {
    createGoal,
    getGoals,
    deleteGoal,
};

export default goalService;