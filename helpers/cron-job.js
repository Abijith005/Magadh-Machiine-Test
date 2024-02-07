import cron from "node-cron";
import authorModel from "../models/authorModel";
import purchaseModel from "../models/purchaseModel";

cron.schedule(
  "59 23 28-31 * *",
  async () => {
    console.log("scheduling job to send email");
    try {
      const authors = await authorModel.findAll();
      const purchase = await purchaseModel.findAll();
      const job = {};
      for (const author of authors) {
        (job.email = author.email), (job.subject = "Revenue Information");
        const authorPurchas = purchase.filter((item) => {
          if (item.authorId == author.id) {
            return item;
          }
        });
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
      throw error;
    }
  },
  {
    scheduled: true,
    timezone: "Your_Timezone", // Specify your timezone (e.g., 'America/New_York')
  }
);
