import { connectDB } from "../connection.js";
import Product from "../schemas/product.schema.js";

export const createProd = async ({title, text, price, soldQuantity = 0, category}) => {

  try {
    await connectDB()
    const res = await Product.create({title, text, price, soldQuantity, category})
    console.log(res)
    return res // si solo querés devolverlo tal cual


  } catch (error) {
    throw new Error("Error al crear el producto: " + error.message);
  }
};

export const findAll = async() =>{
  try{
    await connectDB()
    const res = await Product.find().populate({ path: "category" });
    return res

  }catch(error){
    console.log()
  }
}
export const findById = async (id) => {
  try {
    await connectDB();
    const res = await Product.findById(id).populate({ path: "category" });
    return res;
  } catch (error) {}
};
export const findByCategory = async (category) => {
  try {
    await connectDB();
    const res = await Product.find({ category: category }).populate({path: "category"});
    return res;
  } catch (error) {}
};