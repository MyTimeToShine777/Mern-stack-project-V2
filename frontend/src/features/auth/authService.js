import axios from "axios";

const API_URL_REGISTER = "/api/users";
const API_URL_LOGIN = "/api/users/login";

//Register user
const registerUser = async(userData) => {
    const response = await axios.post(API_URL_REGISTER, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

//Register user
const loginUser = async(userData) => {
    const response = await axios.post(API_URL_LOGIN, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

//Logout User
const logout = () => {
    localStorage.removeItem("user");
};

const authService = {
    registerUser,
    loginUser,
    logout,
};

export default authService;