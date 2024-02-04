import bookModel from "../models/bookModel.js";
export const addBook = async (req, res) => {
  try {
    const { authors, sellCount, title, description, price } = req.body;
   const book= await bookModel.create({ authors, sellCount, title, description, price });
   console.log(book,'===================================');
  } catch (error) {
    console.log("Error \n", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
