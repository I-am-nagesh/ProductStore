import express from "express";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

//GET route to retrieve product
router.get("/", getProducts);

// POST route to create a product
router.post("/", createProduct);

// PUT riute to update a product by ID
router.put("/:id", updateProduct);

// DELETE route to delete a product by ID
router.delete("/:id", deleteProduct);

export default router;
