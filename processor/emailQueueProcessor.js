import sentMail from "../helpers/sentMail.js";
import { limiter } from "../services/queue.js";

const emailQueueProcessor = async(job) => {
  try {
    const {email,subject,html}=job.data
    await limiter.schedule(()=>sentMail(email,subject,html))
    
sentMail(email,subject,html)
  } catch (error) {
    console.log(error);
  }
};

export default emailQueueProcessor