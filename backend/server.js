import path from "path";
import { fileURLToPath } from "url";
import "express-async-errors";
import colors from "colors";
import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
dotenv.config();
import goalRoutes from "./routes/goalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import protectRoute from "../middleware/authMiddleware.js";

const __dirname = path.dirname(fileURLToPath(
    import.meta.url));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Routes

app.use("/api/users", userRoutes);
app.use("/api/v1/goals", protectRoute, goalRoutes);

//Serve Frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(
            path.resolve(__dirname, "../", "frontend", "build", "index.html")
        )
    );
} else {
    app.get("/", (req, res) => res.send("<h1>Please Set To Production</h1>"));
}

//ErrorMiddleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
//Server
const PORT = process.env.PORT || 5000;
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(
            PORT,
            console.log(`Server listening on Port ${PORT}...`.bgCyan.bold)
        );
    } catch (error) {
        console.log(error);
    }
};

start();