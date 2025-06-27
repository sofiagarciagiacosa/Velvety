import { connectDB } from "../connection.js";
import User from "../schemas/user.schema.js";

export const createUser = async (userData) => {
  try {
    await connectDB();
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message);
  }
};

export const findByEmail = async (email) => {
  try {
    await connectDB();
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Error al buscar el usuario: " + error.message);
  }
};
 
  export const findAll = async() =>{
    try{
      await connectDB()
      const res = await User.find();
      return res
  
    }catch(error){
      console.log()
    }
  }
  export const findById = async (id) => {
    try {
      await connectDB();
      const res = await User.findById(id);
      return res;
    } catch (error) {}
  };
  