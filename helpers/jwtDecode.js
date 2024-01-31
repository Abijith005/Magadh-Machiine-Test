import jwt from "jsonwebtoken";

const jwtDecode = (token) => {
  try {
    const decode = jwt.decode(token, process.env.JWT_SIGNATURE);
    return decode;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

export default jwtDecode;
