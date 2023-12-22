import User from "../Models/User.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(errorHandler(403, "No access to this account"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password: pwd, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(errorHandler(401, "You can only delete your account"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been Deleted");
  } catch (error) {
    next(error);
  }
};
