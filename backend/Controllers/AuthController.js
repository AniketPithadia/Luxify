import User from "../Models/User.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPwd = bcryptjs.hashSync(toString(password), 10);
  const newUser = new User({ username, email, password: hashedPwd });

  try {
    await newUser.save();
    return res.json("User Created Successfully");
  } catch (error) {
    next(errorHandler(409, "User Already Exists"));
  }
};
