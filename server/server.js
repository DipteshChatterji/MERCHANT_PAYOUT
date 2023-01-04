const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios=require("axios");
const db = require("./Database/model");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
db.sequelize.sync();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My application." });
});

require("./Database/routes/transaction")(app);
app.get("/api", (req, res) => {
  res.json();
});

app.listen(4005, () => {
  console.log("server running on port 4005");
})



