import { Router } from "express";
import { readFile, writeFile } from "fs/promises";

const router= Router()

// Función para leer y guardar cupones
const readCoupons = async () => {
    const file = await readFile("Client/data/coupons.json", "utf-8");
    return JSON.parse(file);
};

const writeCoupons = async (data) => {
    await writeFile("Client/data/coupons.json", JSON.stringify(data, null, 2));
};

// GET para obtener todos los cupones
router.get('/', async (req, res) => {
    const coupons = await readCoupons();
    res.json(coupons);
});

// GET para obtener cupón por código
router.get('/:code', async (req, res) => {
    const { code } = req.params;
    const coupons = await readCoupons();
    const coupon = coupons.find(c => c.code === code.toUpperCase());

    if (coupon) {
        res.json(coupon);
    } else {
        res.status(404).json({ error: "Cupón no encontrado" });
    }
});

// POST - Crear nuevo cupón
router.post('/nuevo', async (req, res) => {
    const newCoupon = req.body;
    const coupons = await readCoupons();

    if (coupons.find(c => c.code === newCoupon.code)) {
        return res.status(400).json({ error: "Ese código de cupón ya existe" });
    }

    coupons.push(newCoupon);
    await writeCoupons(coupons);

    res.status(201).json({ message: "Cupón creado con éxito", coupon: newCoupon });
});

// POST para aplicar cupón, verifica condiciones
router.post('/apply', async (req, res) => {
    const { code, amount } = req.body;
    const coupons = await readCoupons();
    const coupon = coupons.find(c => c.code === code.toUpperCase());

    if (!coupon) {
        return res.status(404).json({ error: "Cupón inválido" });
    }

    if (coupon.minAmount && amount < coupon.minAmount) {
        return res.status(400).json({ 
            error: `Este cupón requiere un monto mínimo de $${coupon.minAmount}` 
        });
    }

    res.json({ message: "Cupón válido", discount: coupon.discount });
});

// PUT para actualizar cupón existente por código
router.put('/:code', async (req, res) => {
    const { code } = req.params;
    const updatedData = req.body;
    const coupons = await readCoupons();

    const index = coupons.findIndex(c => c.code === code.toUpperCase());

    if (index === -1) {
        return res.status(404).json({ error: "Cupón no encontrado" });
    }

    coupons[index] = { ...coupons[index], ...updatedData };
    await writeCoupons(coupons);

    res.json({ message: "Cupón actualizado", coupon: coupons[index] });
});


export default router;