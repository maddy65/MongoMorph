import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {type: String, require: true, unique: true}
});

const Product  = mongoose.model("Product", productSchema);

export default Product;