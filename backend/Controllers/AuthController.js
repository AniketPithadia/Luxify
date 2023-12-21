import User from "../Models/User.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPwd = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, hashedPwd });

  try {
    await newUser.save();
    return res.json("User Created Successfully");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
