import jwtVerify from "../helpers/jwitVerify.js";

async function retailUserAuth(req, res, next) {
  try {
    const token = req.headers.authorization;
    const authorized = jwtVerify(token);
    if (authorized.role === "Retail User") {
      next();
    } else {
      res.status(401).json({ success: false, message: "unauthorized" });
    }
  } catch (error) {
    console.log("Authorization Error ", error);
    res.status(401).json({ success: false, message: "Authorization error" });
  }
}

export default retailUserAuth;
