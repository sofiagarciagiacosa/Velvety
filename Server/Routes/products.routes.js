import { Router } from "express";
import { readFile, writeFile } from "fs/promises";

const router = Router();

const productsPath = "Client/data/products.json";

// Función para cargar productos
const loadProducts = async () => {
  const file = await readFile(productsPath, "utf-8");
  return JSON.parse(file);
};

// GET para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productsData = await loadProducts();
    res.json(productsData);  
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos." });
  }
});



export default router;