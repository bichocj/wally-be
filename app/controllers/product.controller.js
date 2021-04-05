const db = require("../models");
const Product = db.product;

exports.getAll = (req, res) => {
  Product.find().exec((err, products) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(products)
  });
};
