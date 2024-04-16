import express from "express";

export const verify = async (req: express.Request, res: express.Response) => {
    try {
        const { username } = req.body;

        if ((req as any).user.username === username) {
            return res.status(200).json({ message: "User verified" });
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        console.log(`Error in verify controller: ${error}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
