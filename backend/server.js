import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import Product from "./models/product.model.js";

const app = express();
connectDB();

app.use(express.json()); // allows us to accept JSON data in the req.body

// POST route to create a product
app.post("/api/products", async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// DELETE route to delete a product by ID
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in delete product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
