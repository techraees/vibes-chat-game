import express from "express";
import jwt from "jsonwebtoken";

const generateAndSendToken = (id: any, res: express.Response) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: "15d",
    });

    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "production",
    });
};

export default generateAndSendToken;
