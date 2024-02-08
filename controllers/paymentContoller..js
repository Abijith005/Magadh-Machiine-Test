import stripePackage from "stripe";

const stripe = stripePackage(process.env.STRIPE_SECRET);

export const payment = async (req, res) => {
  try {
    const { amount, name, number, email } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });


    if (paymentIntent.status === "succeeded") {
      // Payment is successful
      res.json({ success: true, message: "Payment confirmed successfully." });
    } else {
      // Payment is not successful
      res
        .status(400)
        .json({ success: false, message: "Payment not confirmed." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
