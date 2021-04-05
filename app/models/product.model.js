const mongoose = require("mongoose");

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    SKU: String,
    code: String,
    name: String,
    description: String,
    pictures: [String],
    price: Number,
    currency: String,
  })
);

module.exports = Product;
