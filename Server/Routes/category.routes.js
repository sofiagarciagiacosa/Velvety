import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import { createCategory } from "../db/actions/category.actions.js";

const router = Router();


// Enrutamientos para base de datos

// POST para el admin para crear producto
router.post('/create', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await createCategory({ name });
    
    res.status(200).json({ message: "Categoría creada con éxito", result });
  } catch (error) {
    console.error("Error en el POST:", error.message);
    res.status(400).json({ error: error.message });
  }
});

//GET para obtener las categorías 
router.get('/All', async (req,res)=>{
  try {
    const result = await findAll()
    res.status(200).json(result)

  }catch(error){
    res.status(400).json()
  }
})




export default router;