import express from "express";
import { createListing } from "../Controllers/ListingController.js";
import { verifyToken } from "../Middlewares/verifyToken.js";
const router = express.Router();

router.post("/create", verifyToken, createListing);
export default router;
