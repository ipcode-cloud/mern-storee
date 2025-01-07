import Product from "../models/product.model.js";

class Products {
  createProduct = async (req, res) => {
    const product = req.body;
    console.log(product);
    if (
      !product.name ||
      !product.price ||
      !product.description ||
      !product.imageUrl
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newProduct = new Product(product);
    try {
      await newProduct.save();
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, imageUrl } = req.body;
    if (!name || !price || !description || !imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    try {
      let updatedProduct = {
        name,
        price,
        description,
        imageUrl,
      };
      const product = await Product.findById(id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      updatedProduct = await Product.findByIdAndUpdate(id, updatedProduct, {
        new: true,
      });
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "The product is deleted" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
}

const productController = new Products();
export default productController;
