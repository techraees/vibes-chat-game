import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        console.log(token);

        next();
    } catch (error) {
        console.log(`Error in protectRoute middleware: ${error.message}`);
        res.status(500).json({ error: "Unauthorized" });
    }
};

export default protectRoute;
