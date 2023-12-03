const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const carRoutes = require("./routes/carRoutes");
const userRoutes = require("./routes/userRoutes");
const jwt = require("jsonwebtoken");
const auth = require("./middlewares/auth");

var cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.use("/api", carRoutes);
app.use("/api", userRoutes);

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

mongoose
  .connect(
    "mongodb+srv://admin:qwertyuiop@richjohnapi.sklrzus.mongodb.net/ite-19?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected");
    app.listen(port, () => {
      console.log(`Server running at port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
