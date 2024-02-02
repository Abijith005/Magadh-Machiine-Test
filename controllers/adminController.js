export const createAuthor=async (req,res)=>{
    try {
        const {name,email,password}=req.body
        
    } catch (error) {
        
    console.error("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    }
}