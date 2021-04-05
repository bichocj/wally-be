const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

const db = require("./app/models");
const uriConnection= `mongodb://${dbConfig.USER}:${dbConfig.PWD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}?authSource=${dbConfig.AUTH_SOURCE}`;

db.mongoose
  .connect(uriConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/product.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
