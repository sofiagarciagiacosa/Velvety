import { connectDB } from "../connection.js";
import Order from "../schemas/order.schema.js";

export const createOrder = async ({user, products, coupon, total}) => {

    try {
      await connectDB()
      const res = await Order.create({ user, products, coupon, total });
      console.log(res)
      return res // si solo querés devolverlo tal cual
  
  
    } catch (error) {
      throw new Error("Error al crear la orden: " + error.message);
    }
  };

  export const findAll = async() =>{
    try{
      await connectDB();
      const res = await Order.find().populate("coupon").populate("products.product").populate("user"); 

      return res;
    }catch(error){
      console.log()
    }
  }

