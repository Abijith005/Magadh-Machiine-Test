import authorModel from "../models/authorModel.js";
import {emailQueue} from '../services/queue.js'

export const senteee = async (req, res) => {
  try {
    const authors=await authorModel.findAll()

    const job={}
    for (const author of authors) {
      job.email=author.email
      job.subject='New Book Release Notification '
      job.html=`<h1>Hello it is a test mail</h1>`
      await emailQueue.add(job)
    }
  
    res.status(200).json({ message: "Jobs added to the queue" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
