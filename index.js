const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

// import routes
const contactRoute = require("./controllers/contactRoute.js");

// db connect
mongoose
  .connect(process.env.DB_CONNECT, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to DB");
    app.listen(3030);
  })
  .catch((err) => console.log(err));

// middleware
app.use(express.json());
app.use(cors());

// route middlewares
app.use("/contact", contactRoute);
