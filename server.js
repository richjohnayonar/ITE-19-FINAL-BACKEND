require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const carRoutes = require("./routes/carRoutes");
const userRoutes = require("./routes/userRoutes");
const auth = require("./middlewares/auth");
var cors = require("cors");

const app = express();
const MONGO_URL = process.env.MONGO_URL;
const port = process.env.PORT || 8100;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.use("/api/car", auth, carRoutes);
app.use("/api/user", userRoutes);

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access mes anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected");
    app.listen(port, () => {
      console.log(`Server running at localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
