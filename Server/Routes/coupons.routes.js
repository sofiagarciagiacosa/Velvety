import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import { createCoupon, findAll, findById } from "../db/actions/couponActions.js";

const router= Router()

// MIGRACIÓN A BASE DE DATOS

// GET / - Obtener todos los cupones
router.get("/", async (req, res) => {
    try {
      const coupons = await findAll();
      res.json(coupons);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener cupones" });
    }
});
  
  // GET /special - Obtener solo los cupones "special"
  router.get("/special", async (req, res) => {
    try {
      const coupons = await findAll();
      const specialCoupons = coupons.filter((c) => c.special === true);
      res.json(specialCoupons);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener cupones especiales" });
    }
  });
  
  // POST /apply - Guardar el cupón aplicado por un usuario
  // (En una versión realista deberías tener una colección de "appliedCoupons" o guardarlo en el modelo de usuario)
  router.post("/apply", async (req, res) => {
    const { email, code } = req.body;
  
    if (!email || !code) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }
  
    try {
      // Esta es una implementación temporal. En una versión más avanzada:
      // - Validar si el cupón existe
      // - Registrar en una colección de uso de cupones (appliedCoupons o dentro de Order)
  
      res.json({ message: `Cupón "${code}" aplicado por ${email}` });
    } catch (error) {
      res.status(500).json({ message: "Error al aplicar cupón" });
    }
  });

// POST /coupons para crear cupones desde el panel admin
  router.post("/create", async (req, res) => {
    const { code, discount, condition, minAmount, special, active } = req.body;
    try {
      const coupon = await createCoupon({
        code,
        discount,
        condition,
        minAmount,
        special,
        active,
      });
      res.status(201).json({ message: "Cupón creado", coupon });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

export default router;