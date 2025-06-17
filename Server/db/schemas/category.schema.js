import mongoose from "mongoose";
import 'dotenv/config'

const {Schema, models, model} = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Category = models.category || model("category", categorySchema);

export default Category;
