import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        trim: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("User", userSchema);