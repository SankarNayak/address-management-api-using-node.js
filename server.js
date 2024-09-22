const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const app = express();
const PORT = process.env.PORT;

const bodyParser = require("body-parser");

const connectDb = require("./utils/database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoute = require("./router/user-router");
app.use("/", userRoute);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
