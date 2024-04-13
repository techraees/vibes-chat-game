import express from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import generateAndSendToken from "../utils/generateToken";

export const signup = async (req: express.Request, res: express.Response) => {
    try {
        const { username, password, email } = req.body;

        // Check if all fields are filled in and been sent
        if (!username || !password || !email) {
            return res
                .status(400)
                .json({ message: "Please fill in all fields" });
        }

        // Check if the user already exists
        const userCheck = await User.findOne({ username });

        if (userCheck) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Check if the email already exists
        const emailCheck = await User.findOne({ email });

        if (emailCheck) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        // Generate and send token
        if (newUser) {
            const token = generateAndSendToken(newUser._id);
            await newUser.save();

            return res.status(201).json({
                user: newUser,
                token: token,
            });
        } else {
            return res.status(500).json({ message: "Something went wrong" });
        }
    } catch (error) {
        console.log(`Error in signup controller: ${error}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const signin = async (req: express.Request, res: express.Response) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user?.password || ""
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(`Error in signin controller: ${error}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
