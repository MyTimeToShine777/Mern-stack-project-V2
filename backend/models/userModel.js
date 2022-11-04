import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please Provide valid Email",
        ],
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

//Hash Password
userSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Generate JWT
userSchema.methods.generateToken = function() {
    return jwt.sign({ userId: this._id, name: this.name },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

//Check Login Credentials
userSchema.methods.comparePassword = async function(loginPassword) {
    const isMatch = await bcrypt.compare(loginPassword, this.password);
    return isMatch;
};

export default mongoose.model("User", userSchema);