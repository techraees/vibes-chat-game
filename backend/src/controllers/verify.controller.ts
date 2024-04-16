import express from "express";

export const verify = async (req: express.Request, res: express.Response) => {
    try {
        res.status(200).json({ message: "User is verified" });
    } catch (error) {
        console.log(`Error in verify controller: ${error}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
