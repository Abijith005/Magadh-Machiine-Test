import authorModel from "../models/authorModel";
import bcrypt from "bcrypt";

export const authorRegistration = async (req, res) => {
  try {
    const { name, email } = req.body;
    const [author,created]=await authorModel.findOrCreate({where:{email:email},defaults:{name,email,password:await bcrypt.hash(password,10)}})
    if (created) {
      res
        .status(200)
        .json({ success: true, message: "Author registered successfully" });
    }else{
      res.status(409).json({success:false,message:"Author already exits"})
    }  
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
}
};


export const authorLogin=async(req,res)=>{
    try {
        const { email, password } = req.body;
        const author = await authorModel.findOne({ where: { email: email } });
        if (author) {
          const matchPassword = await bcrypt.compare(password, author.password);
          if (matchPassword) {
            const token = jwtSign({ email: author.email, role: "Author" });
            res
              .status(200)
              .json({
                success: true,
                message: "Login successfull",
                authToken:token
              });
          } else {
            res.status(401).json({ success: false, message: "Incorrect password" });
          }
        } else {
          res.status(404).json({ success: false, message: "Author not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
        
    }
}