import Queue from "bull";
import emailQueueProcessor from "../processor/emailQueueProcessor.js";
import Bottleneck from "bottleneck";

const redisConfig = {
  host:process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

const emailQueue = new Queue("emailQueue", {
  redis: redisConfig,
});

emailQueue.process(emailQueueProcessor)

const limiter= new Bottleneck({maxConcurrent:1,minTime:60000/100})

export {emailQueue, limiter};
