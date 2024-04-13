import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import connectToDatabase from "./database/connect";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", authRoutes);
app.use("/api/admin/", adminRoutes);

app.listen(PORT, () => {
    connectToDatabase();
    console.log(`Server is running on port ${PORT}`);
});
