import jwtSign from "../helpers/jwtSign.js";
import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = adminModel.findOne({ where: { email: email } });
    if (admin) {
      if (bcrypt.compare(password, admin.password)) {
        const token = jwtSign({ email, role: "Admin" });
        res.status(200).json({ success: true, message: "Login successfull" ,authToken:token});
      } else {
        res.status(401).json({ success: false, message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
