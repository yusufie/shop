import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: String,
    slug: String,
    model: String,
    stock: Number,
    description: String,
    images: [String],
    discount: Number,
    price: Number,
    ratingsAverage: Number,
    ratingsQuantity: Number,
    category: String,
    subcategories: String,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;