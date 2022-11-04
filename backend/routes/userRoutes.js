import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/userController.js";

import protectRoute from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(protectRoute, getMe);

export default router;
