import Listing from "../Models/Listing.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (req.user.id !== listing.userRef)
    return next(errorHandler(403, "No access to this account"));
  try {
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json("Listing has been deleted");
  } catch (error) {
    next(error);
  }
};
