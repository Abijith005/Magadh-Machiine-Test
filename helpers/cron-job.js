import cron from "node-cron";
import authorModel from "../models/authorModel.js";
import purchaseModel from "../models/purchaseModel.js";
import { emailQueue } from "../config/queue.js";
import { revenueNotification } from "../controllers/adminController.js";
const cronJob = () => {
  cron.schedule(
    "05 23 * * *",
    async () => {
      try {
        revenueNotification();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );
};

export default cronJob;
