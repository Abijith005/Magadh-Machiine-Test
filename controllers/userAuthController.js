// controllers/userController.js
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwtSign from "../helpers/jwtSign.js";

export const userRegistration = async (req, res) => {
  try {
    const { name, email,password } = req.body;
    const [user,created]=await userModel.findOrCreate({where:{email:email},defaults:{name,email,password:await bcrypt.hash(password,10)}})
    if (created) {
      res
        .status(200)
        .json({ success: true, message: "User registered successfully" });
    }else{
      res.status(409).json({success:false,message:"User already exits"})
    }
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ where: { email: email } });
    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        const token = jwtSign({ email: user.email, role: "Retail User" });
        res.setHeader('authToken',token)
        res
          .status(200)
          .json({
            success: true,
            message: "Login successfull",
          });
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

export const hello=async(req,res)=>{
  try {
    
    console.log('hello iam in controller');
  } catch (error) {
    
  }
}
