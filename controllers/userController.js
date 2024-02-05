import jwtDecode from '../helpers/jwtDecode.js';
import purchaseModel from '../models/purchaseModel.js'
import reviewsModel from '../models/reviewsModel.js';

export const purchaseBook = async (req, res) => {
  try {
    const {bookId,quantity,price}=req.body
    const{userId}=jwtDecode(req.headers.authentication)
    await purchaseModel.create({userId,bookId,quantity,price})
    res.status(200).json({success:true,message:'Purchased book suucessfully'})
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const purchaseHistory=async(req,res)=>{
  try {
    const {userId}=jwtDecode(req.headers.authentication)
    const purchaseHistory=await purchaseModel.findAll({where:{userId:userId}})
    res.status(200).json({success:true,purchaseHistory})
    
  } catch (error) {
  console.error("error", error);
  res.status(500).json({ success: false, message: "Internal server error" });
  
}
}

export const reviewBook=async (req,res)=>{
  try {
    
    const {bookId,rating,review}=req.body
    const {userId}= jwtDecode(req.headers.authentication)
    await reviewsModel.create({bookId,userId,rating,review})
    res.status(200).json({success:true,message:"Rated book suuccessfully"})
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    
  }
}
