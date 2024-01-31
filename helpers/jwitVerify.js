import jwt from "jsonwebtoken";

const jwtVerify = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SIGNATURE);
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

export default jwtVerify;
