import express from "express";
import data from "./data";
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import bodyParser from "body-parser";
import orderRoute from "./routes/orderRoute";

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoute);

app.use("/api/products", productRoute);

app.use("/api/orders", orderRoute);

app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

app.listen(config.PORT, () => {
  console.log("Server started at localhost " + config.PORT);
});
