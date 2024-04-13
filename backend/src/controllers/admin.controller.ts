import User from "../models/user.model.js";

export const roleConfirmation = async (req, res) => {
    try {
    } catch (error) {
        console.log(`Error in roleConfirmation controller: ${error.message}`);
        res.status(500).json({ error: "Unauthorized" });
    }
};
