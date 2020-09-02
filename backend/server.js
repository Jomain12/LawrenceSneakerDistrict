import express from "express";
import data from "./data";
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import bodyParser from "body-parser";
import orderRoute from "./routes/orderRoute";
import path from "path";
import uploadRoute from "./routes/uploadRoute";

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json());

app.use("/api/uploads", uploadRoute);

app.use("/api/users", userRoute);

app.use("/api/products", productRoute);

app.use("/api/orders", orderRoute);

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));

app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

app.use(express.static(path.join(__dirname, "/../frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/../frontend/build/index.html"))
);

app.listen(config.PORT, () => {
  console.log("Server started at localhost " + config.PORT);
});
