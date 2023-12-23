import express from "express";
import {
  createListing,
  deleteListing,
} from "../Controllers/ListingController.js";
import { verifyToken } from "../Middlewares/verifyToken.js";
const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
export default router;
