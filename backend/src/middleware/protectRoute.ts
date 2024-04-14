import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/user.model.js";

interface CustomRequest extends Request {
    cookies: any;
    user?: any;
}

const protectRoute = async (
    req: CustomRequest,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const token: string = req.cookies.token;

        if (!token) {
            res.status(401).json({ error: "Unauthorized - No Token Provided" });
            return;
        }

        const decoded: any = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        if (!decoded) {
            res.status(401).json({ error: "Unauthorized - Invalid Token" });
            return;
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            res.status(404).json({ error: "Unauthorized - User Not Found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(`Error in protectRoute middleware: ${error.message}`);
        res.status(500).json({ error: "Unauthorized" });
    }
};

export default protectRoute;
