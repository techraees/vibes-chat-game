import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const verify = async (req: express.Request, res: express.Response) => {
    try {
        const { username } = req.body;
        const token: string = req.cookies.authToken;

        if (!token) {
            res.status(401).json({ id: null });
            return;
        }

        const decoded: any = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        if (!decoded) {
            res.status(401).json({ id: null });
            return;
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            res.status(401).json({ id: null });
            return;
        }

        if (user?.username !== username) {
            res.status(401).json({ id: null });
            return;
        }

        if (user?.username === username) {
            res.status(201).json({ id: user?._id });
        }
    } catch (error) {
        console.log(`Error in verify controller: ${error}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
