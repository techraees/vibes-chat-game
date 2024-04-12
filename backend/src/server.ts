import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./database/connect";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
    connectToDatabase();
    console.log(`Server is running on port ${PORT}`);
});
