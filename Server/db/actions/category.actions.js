import { connectDB } from "../connection.js";
import Category from "../schemas/category.schema.js";

export const createCategory = async ({name}) => {

  try {
    await connectDB()
    const res = await Category.create({ name });
    console.log(res)
    return res 
  } catch (error) {
    console.log(error);
  }
};

export const findAll = async() =>{
  try{
    await connectDB()
    const res = await Category.find()
    return res

  }catch(error){
    console.log()
  }
}

