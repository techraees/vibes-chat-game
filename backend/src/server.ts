import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.listen(3333, () => {
    console.log("Server started on port 3333");
});
