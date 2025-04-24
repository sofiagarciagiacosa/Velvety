import { Router } from "express";
import { readFile, writeFile } from "fs/promises";

const router = Router();

const productsPath = "Client/data/products.json";

// Función para cargar productos
const loadProducts = async () => {
  const file = await readFile(productsPath, "utf-8");
  return JSON.parse(file);
};

// Función para guardar productos
const saveProducts = async (data) => {
  await writeFile(productsPath, JSON.stringify(data, null, 2));
};


// GET para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productsData = await loadProducts();
    const allProducts = productsData.flatMap((cat) => cat.productos);
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos." });
  }
});

// GET para obtener producto por id
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productsData = await loadProducts();
    const product = productsData
      .flatMap((c) => c.productos)
      .find((p) => p.id === id);

    product
      ? res.json(product)
      : res.status(404).json({ error: "Producto no encontrado." });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el producto." });
  }
});

//POST para crear un nuevo producto
router.post("/nuevo", async (req, res) => {
    const { categoria, nuevoProducto } = req.body;

    if (!categoria || !nuevoProducto) {
        return res.status(400).json({ error: "Faltan datos." });
    }

    try {
        const productsData = await loadProducts();
        const category = productsData.find((c) => c.categoria === categoria);

        if (!category) {
        return res.status(404).json({ error: "Categoría no encontrada." });
        }

        category.productos.push(nuevoProducto);
        await saveProducts(productsData);
        res.status(201).json({ message: "Producto creado con éxito." });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto." });
    }
});

//POST para filtrar productos por categoría
router.post("/filter", async (req, res) => {
    const { categoria } = req.body;

    try {
        const productsData = await loadProducts();
        let productos = productsData.flatMap((c) => c.productos);

        if (categoria) {
        const cat = productsData.find((c) => c.categoria === categoria);
        productos = cat ? cat.productos : [];
        }
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al filtrar productos." });
    }
});

//PUT para actualizar producto
// Actualizar producto existente
router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    try {
        const productsData = await loadProducts();
        let updated = false;

        for (const cat of productsData) {
        const index = cat.productos.findIndex(p => p.id === id);
        if (index !== -1) {
            cat.productos[index] = { ...cat.productos[index], ...updatedData };
            updated = true;
            break;
        }
        }

        if (updated) {
        await saveProducts(productsData);
        res.json({ message: "Producto actualizado." });
        } else {
        res.status(404).json({ error: "Producto no encontrado." });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar producto." });
    }
});

export default router;