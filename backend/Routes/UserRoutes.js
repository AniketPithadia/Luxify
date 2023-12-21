import express from "express";
import { signup } from "../Controllers/UserController.js";

const router = express.Router();

router.get("/signup", signup);

export default router;
