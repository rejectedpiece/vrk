const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')

require("dotenv").config();

//app.use(express.static(resolve(__dirname, process.env.STATIC_DIR)));

app.use(express.static(path.join(__dirname, "/client")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/success", (req, res) => {
  return res.sendFile(path.join(__dirname + "/client/success.html"));
});

// creating a route for cancel page:
app.get("/cancel", (req, res) => {
  return res.sendFile(path.join(__dirname + "/client/cancel.html"));
});

app.get("/workshop1", (req, res) => {
  return res.sendFile(
    path.join(__dirname + "/client/workshops/workshop1.html")
  );
});

app.get("/workshop2", (req, res) => {
  return res.sendFile(
    path.join(__dirname + "/client/workshops/workshop2.html")
  );
});

app.get("/workshop3", (req, res) => {
  return res.sendFile(
    path.join(__dirname + "/client/workshops/workshop3.html")
  );
});

const domainURL = process.env.DOMAIN;
app.post("/create-checkout-session/:pid", async (req, res) => {
  const priceId = req.params.pid;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${domainURL}/success?id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/cancel`,
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    // allowing the use of promo-codes:
    allow_promotion_codes: true,
  });
  res.json({
    id: session.id,
  });
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`${port} is connected and listening`));
