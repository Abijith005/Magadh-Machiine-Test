export const userRegistration = () => {
  try {
    
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
