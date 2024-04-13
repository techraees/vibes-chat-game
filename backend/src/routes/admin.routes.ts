import express from "express";
import protectRoute from "../middleware/protectedRoute.ts";
import { roleConfirmation } from "../controllers/admin.controller.ts";

const router = express.Router();

router.get("/confirmation", protectRoute, roleConfirmation);

export default router;
