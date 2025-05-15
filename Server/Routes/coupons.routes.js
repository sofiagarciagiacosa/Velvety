import { Router } from "express";
import { readFile, writeFile } from "fs/promises";

const router= Router()

// Función para leer y guardar cupones
const readCoupons = async () => {
    const file = await readFile("Client/data/coupons.json", "utf-8");
    return JSON.parse(file);
};

// GET para obtener todos los cupones
router.get('/', async (req, res) => {
    const coupons = await readCoupons();
    res.json(coupons);
});

// Devuelve solo los cupones especiales
router.get('/special', async (req, res) => {
    const coupons = await readCoupons();
    const specialCoupons = coupons.filter(c => c.special === true);
    res.json(specialCoupons);
});

// Ruta para guardar el cupón aplicado por un usuario
router.post('/apply', async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    try {
        const filePath = `Client/data/appliedCoupons.json`;

        let data = [];
        try {
            const file = await readFile(filePath, "utf-8");
            data = JSON.parse(file);
        } catch (_) {
            // Archivo no existe o está vacío, continúa
        }

        const updatedData = data.filter(entry => entry.email !== email);
        updatedData.push({ email, code });

        await writeFile(filePath, JSON.stringify(updatedData, null, 2));
        res.json({ message: "Cupón guardado" });
    } catch (error) {
        console.error("Error al guardar cupón:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});


export default router;