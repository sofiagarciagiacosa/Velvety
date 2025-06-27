import { connectDB } from "../connection.js";
import Coupon from "../schemas/coupon.schema.js";

export const createCoupon = async ({code, discount, condition, minAmount, special, active}) => {

  try {
    await connectDB()
    const res = await Coupon.create({code, discount, condition, minAmount, special, active})
    console.log(res)
    return res // si solo querés devolverlo tal cual


  } catch (error) {
    throw new Error("Error al crear el cupón: " + error.message);
  }
};

export const findAll = async() =>{
  try{
    await connectDB()
    const res = await Coupon.find();
    return res

  }catch(error){
    console.log()
  }
}
export const findById = async (id) => {
  try {
    await connectDB();
    const res = await Coupon.findById(id);
    return res;
  } catch (error) {}
};
