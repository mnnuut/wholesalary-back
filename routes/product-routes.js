const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/products", getProducts); //in use
router.get("/product/:id", getProduct); // in use
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

module.exports = {
  routes: router,
};
