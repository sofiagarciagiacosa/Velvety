import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true, // Para evitar duplicados
      trim: true,
    },
    discount: {
      type: Schema.Types.Mixed, // Puede ser número o string ("Envío Gratis")
      required: true,
    },
    condition: {
      type: String,
      required: false,
      trim: true,
    },
    minAmount: {
      type: Number,
      default: 0,
    },
    special: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true, // Por si querés desactivar cupones fácilmente
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = models.coupon || model("coupon", couponSchema);
export default Coupon;
