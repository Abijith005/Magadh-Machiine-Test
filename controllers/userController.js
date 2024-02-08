import { Op, where } from "sequelize";
import jwtDecode from "../helpers/jwtDecode.js";
import bookModel from "../models/bookModel.js";
import purchaseModel from "../models/purchaseModel.js";
import reviewsModel from "../models/reviewsModel.js";
import slugify from "slugify";
import authorModel from "../models/authorModel.js";
import moment from "moment";
import { emailQueue } from "../config/queue.js";

export const purchaseBook = async (req, res) => {
  try {
    const { bookId, quantity, price } = req.body;

    const { userId, email } = jwtDecode(req.headers.authorization);

    const book = await bookModel.findByPk(bookId);
    const authorId=book.dataValues.authors

    await purchaseModel.create({ userId, bookId,authorId, quantity, price });

    const subject = "Pruchase Confirmation";
    const html = `
<p>Thank you for your purchase!</p>
<h2>Purchase Details:</h2>
<ul>
  <li>Book Title:${book.dataValues.title.replace(/-/g, " ")}</li>
  <li>Quantity: ${quantity}</li>
  <li>Total Price:${price}</li>
</ul>
<p>Thanks again for choosing our bookstore!</p>
    `;
    await emailQueue.add({ email, subject, html }, { attempts: 1 });

    res
      .status(200)
      .json({ success: true, message: "Purchased book suucessfully" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const purchaseHistory = async (req, res) => {
  try {
    const { userId } = jwtDecode(req.headers.authorization);
    const purchaseHistory = await purchaseModel.findAll({
      where: { userId: userId },
    });
    res.status(200).json({ success: true, purchaseHistory });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const reviewBook = async (req, res) => {
  try {
    const { bookId, rating, review } = req.body;
    const { userId } = jwtDecode(req.headers.authorization);
    await reviewsModel.create({ bookId, userId, rating, review });
    res
      .status(200)
      .json({ success: true, message: "Rated book suuccessfully" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const searchBook = async (req, res) => {
  try {
    const { title, author, price, date } = req.query;
    const query = {};
    if (date) {
      const [minDate, maxDate] = JSON.parse(date).map((item) =>
        moment.utc(item, "DD-MM-YYYY").toDate()
      );
      maxDate.setHours(23, 59, 59, 999);
      query.createdAt = { [Op.between]: [minDate, maxDate] };
    }
    if (price) {
      const [minPrice, maxPrice] = JSON.parse(price).map(parseFloat);
      query.price = { [Op.between]: [minPrice, maxPrice] };
    }

    if (title) query.title = { [Op.like]: `%${slugify(title)}%` };
    if (author) {
      const authors = await authorModel.findAll({
        where: { name: { [Op.like]: `%${author}%` } },
      });
      const authorsIds = authors.map((item) => item.id);
      query.authors = { [Op.in]: authorsIds };
    }

    console.log(query);
    const result = await bookModel.findAll({ where: query });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
