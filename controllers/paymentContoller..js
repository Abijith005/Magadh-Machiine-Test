import cashfree from "@cashfreepayments/cashfree-sdk";
import generateOrderId from "../helpers/generateOrderId.js";

const cashfreeInstance=new cashfree({
  env:'TEST',
  clientId:process.env.CASHFREE_APP_ID,
  clientSecret:process.env.CASHFREE_SECRET
})


export const payment = async (req, res) => {
  try {
    const {amount,name,number,email}=req.body
    const orderId = generateOrderId();

  

    // const paymentLink = await cfClient.paymentLink.create(orderData);

    res.json({ orderId, paymentLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
