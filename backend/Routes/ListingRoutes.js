import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from "../Controllers/ListingController.js";
import { verifyToken } from "../Middlewares/verifyToken.js";
const router = express.Router();
router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/getListing/:id", getListing);
router.get("/get", getListings);
export default router;
