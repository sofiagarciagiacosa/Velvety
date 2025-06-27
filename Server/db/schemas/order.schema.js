import mongoose from "mongoose";
const { Schema, model, models, Types } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    products: [
      {
        product: { type: Types.ObjectId, ref: "product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    coupon: {
      type: Types.ObjectId,
      ref: "coupon",
      default: null,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Esto te genera createdAt y updatedAt automáticamente
  }
);

const Order = models.order || model("order", orderSchema);
export default Order;
