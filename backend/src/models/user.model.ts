import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unqiue: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://via.placeholder.com/150",
    },
    authority: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    vCoins: {
        type: Number,
        default: 0,
    },
    vCard: {
        type: Number,
        default: 0,
    },
    married: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model("User", userSchema);

export default User;
