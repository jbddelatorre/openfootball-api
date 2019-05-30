require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

var cors = require("cors");

const PORT = process.env.PORT || 5000;
const api = require("./routes/api");

// GLOBAL VARIABLES
global.db = require("./models");

//DB CONFIG
const db = process.env.DB_URI;

// MONGOOSE INTERNAL SETTING
mongoose.set("useCreateIndex", true);

(async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Could not connect to MongoDB: " + err);
  }
})();

// CORS
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// MIDDLEWARE - BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ENDPOINTS
app.use("/api", api);

// TEST ENDPOINT
app.get("/", (req, res) => {
  res.send({
    express: "UPDATE GIT EMAIL"
  });
});

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});
