import express from "express";
import cors from "cors";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

app.post("/api/order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Order create error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
