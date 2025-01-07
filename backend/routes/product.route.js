import express from "express";
import productController from "../controllers/product.controller.js";

const router = express.Router();
router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);
router
  .route("/:id")
  .get(productController.getProductById)
  .delete(productController.deleteProduct)
  .put(productController.updateProduct);

export default router;
