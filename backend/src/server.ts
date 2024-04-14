import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import connectToDatabase from "./database/connect";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Specify the exact origin
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/", authRoutes);

app.listen(PORT, () => {
    connectToDatabase();
    console.log(`Server is running on port ${PORT}`);
});
