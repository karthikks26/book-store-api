const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const Port = process.env.PORT;
const mongoose = require("mongoose");
const { URL } = require("./Config");
const cors = require("cors");

app.use(express.json());
app.use(cors({origin:"https://bookstoreapi-two.vercel.app/"}));
//Homepage
app.get("/", (req, res) => {
  res.status(200).send("Homepage");
});
app.use("/books", require("./Router/router"));

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connceted to database");
    app.listen(Port, (req, res) => {
      console.log(`Server started at Port :${Port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
