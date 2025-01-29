import ProductService from "../service/productService.js";

class ProductController {
  static async getProducts(req, res) {
    try {
      const products = await ProductService.getAllProduct();
      res.status(200).json({data: products});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createProduct(req, res) {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json({ data: newProduct });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
      res.status(200).json({ data: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default ProductController;
