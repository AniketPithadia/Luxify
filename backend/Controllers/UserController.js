import User from "../Models/User.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  const newUser = new User({ username, email, password });
  await newUser.save();
  return res.json("User Created Successfully");
};
