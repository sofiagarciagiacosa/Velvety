import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import { createProd, findAll, findById, findByCategory } from "../db/actions/product.actions.js";

const router = Router();


// MIGRACIÓN A BASE DE DATOS

// POST para el admin para crear producto
router.post('/create', async (req, res) => {
  const { title, text, price, soldQuantity, category } = req.body;
  try {
    const result = await createProd({ title, text, price, soldQuantity, category });
    console.log(result);
    res.status(200).json({ message: "Producto creado con éxito", result });
  } catch (error) {
    console.error("Error en el POST:", error.message);
    res.status(400).json({ error: error.message });
  }
});

//GET para obtener prods de la base de datos
router.get('/All', async (req,res)=>{
  try {
    const result = await findAll()
    res.status(200).json(result)

  }catch(error){
    res.status(400).json()
  }
})

//GET para obtener producto por id
router.get("/byId/:id", async (req, res) => {
  const id= req.params.id
  
  try {
    const result = await findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json();
  }
});

//GET para obtener producto por categoría
router.get("/byCategory/:category", async (req, res) => {
  const category = req.params.category
  
  try {
    const result = await findByCategory(category);
    res.status(200).json(result);
    console.log(result)
  } catch (error) {
    res.status(400).json();
  }
});


export default router;