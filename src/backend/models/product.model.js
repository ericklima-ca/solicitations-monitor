const { model, Schema } = require("mongoose");

const productSchema = Schema({
  sku: String,
  description: String,
  ean: String,
  imageUrl: string,
});

const Product = model("Product", productSchema);

module.exports = Product;
