import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
} from "../Controllers/ListingController.js";
import { verifyToken } from "../Middlewares/verifyToken.js";
const router = express.Router();
router.get("/getListing/:id", verifyToken, getListing);
router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
export default router;
