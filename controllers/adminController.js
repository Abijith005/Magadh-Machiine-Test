import authorModel from "../models/authorModel.js";
import purchaseModel from "../models/purchaseModel.js";
export const createAuthor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const test = async (req, res) => {
  try {
    const authors = await authorModel.findAll();
    const purchase = await purchaseModel.findAll();
    const job = {};
    for (const author of authors) {
      (job.email = author.email), (job.subject = "Revenue Information");
      const authorPurchase = purchase.filter((item) => {
        if (item.authorId == author.id) {
          return item;
        }
      });

      const currentMonth = (new Date().getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const currentYear = new Date().getFullYear();

      const revenue = authorPurchase.reduce(
        (accumulator, item) => {
          const [year, month] = item.createdAt.toISOString().split("-");

          if (year == currentYear) {
            accumulator.yearly += item.price;
            if (month == currentMonth) {
              accumulator.monthly += item.price;
            }
          }
          return accumulator;
        },
        { monthly: 0, yearly: 0 }
      );

      console.log(revenue);
      job.html = `<h1>Monthly Revenue Report</h1>
  
          <p>Dear ${author.name},</p>
          
          <p>We are pleased to provide you with the latest revenue information for our bookstore. Here are the details:</p>
          
          <h2>Revenue Details:</h2>
          
          <ul>
            <li><strong>Current Month Revenue:</strong> $[Current Month Revenue]</li>
            <li><strong>Current Year Revenue:</strong> $[Current Year Revenue]</li>
            <li><strong>Total Revenue:</strong> $ ${author.revenue}</li>
          </ul>
          
          <p>Thank you for your continued support. If you have any questions or would like more information, feel free to reach out to us.</p>
          
          <p>Best regards,<br>
           BOOK STORE</p>`;
    }
  } catch (error) {
    console.log(error);
  }
};
