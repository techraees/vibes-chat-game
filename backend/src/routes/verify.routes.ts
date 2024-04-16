import express from "express";
import { verify } from "../controllers/verify.controller";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.post("/verify", protectRoute, verify);

export default router;
