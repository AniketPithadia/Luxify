import express from "express";
import { google, signin, signup } from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
export default router;
