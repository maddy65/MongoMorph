import Product from "../models/Product.js";

class ProductService {
  static async getAllProduct() {
    try {
      return await Product.find();
    } catch (error) {
      throw new Error("Error fetching product: " + error.message);
    }
  }

  static async createProduct(productData) {
    try {
      const newProduct = new Product(productData);
      return await newProduct.save();
    } catch (error) {
      throw new Error("Error creating industry: " + error.message);
    }
  }

  static async updateProduct(id, productData) {
    try {
      return await Product.findByIdAndUpdate(id, productData, { new: true });
    } catch (error) {
      throw new Error("Error updating product: " + error.message);
    }
  }

  static async deleteProduct(id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Error deleting product: " + error.message);
    }
  }
}

export default ProductService;
