import express from "express";
import Stripe from "stripe";
import cors from "cors";
import morgan from "morgan";

const app = express();
const private_key =
  "sk_test_51Qb71wRvK5c7Z1atizvYiZ9MF5on9Tfa0OK3zcyC4FgRM0yTySshrtp0TahGQiCgToxImvsZF8EK75yBo5qLTW9B00XuSUafUx";

const stripe = new Stripe(private_key);

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.post("/checkout", async (req, res) => {
  try {
    const { id, amount, description } = req.body;
    const payment = await stripe.paymentIntents.create({
      payment_method: id,
      amount: amount,
      currency: "USD",
      description: description,
      //confirm: true,
    });

    res.status(200).send({
      payment: payment,
    });
  } catch (error) {
    console.log(error.raw.message)
    res.status(500).json({ error: error, message: error.raw.message });
  }
});

app.listen(3005, () => {
  console.log("server on 3005");
});
