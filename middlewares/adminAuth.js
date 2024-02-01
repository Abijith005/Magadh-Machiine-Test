import jwtVerify from "../helpers/jwitVerify.js";

async function adminAuth(req, res, next) {
  try {
    const token = req.headers.authentication;
    const authorized = jwtVerify(token);
    if (authorized.role === "Admin") {
      next();
    } else {
      res.status(401).json({ success: false, message: "unauthorized" });
    }
  } catch (error) {
    console.log("Authorization Error ", error);
    res.status(401).json({ success: false, message: "Authorization error" });
  }
}

export default adminAuth;
