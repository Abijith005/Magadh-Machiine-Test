import bookModel from "../models/bookModel.js";
import userModel from "../models/userModel.js";
import authorModel from "../models/authorModel.js";
export const addBook = async (req, res) => {
  try {
    const { authors, sellCount, title, description, price } = req.body;
    await bookModel.create({ authors, sellCount, title, description, price });
    const users = await userModel.findAll();
    const author=await authorModel.findByPk(authors)
    const job = {};
    for (const user of users) {
      job.email = user.email;
      job.subject = "New Book Release Notification ";
      job.html = `<h1>Exciting New Book Release!</h1>
      <p>We are thrilled to announce the release of our latest book, <strong>${title}</strong> by ${author.dataValues.name}!</p>
      <p>Description: ${description}</p>
      <p>Release Date: ${new Date().toDateString()}</p>
      <p>Don't miss out on this captivating read. Order your copy today!</p>
      <p>Thank you for your continued support.</p>
      `;
      await emailQueue.add(job);
    }
    res.status(200).json({ success: true, message: "Book added successfully" });
  } catch (error) {
    console.log("Error \n", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
