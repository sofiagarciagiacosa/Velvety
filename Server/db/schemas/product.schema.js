import mongoose from "mongoose";
import 'dotenv/config'

const {Schema, models, model, ObjectId} = mongoose;

const productSchema = new Schema(
  {
    imgSrc: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    price: { type: Number, required: true },
    soldQuantity: { type: Number, default: 0 },
    category: { type: ObjectId, required: true, ref:"category" }, 
  },
  {
    timestamps: true,
  }
);

const Product = models.product || model("product", productSchema);

export default Product;
