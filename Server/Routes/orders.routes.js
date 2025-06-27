import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { createOrder } from "../db/actions/order.actions.js";
const router = Router();

const ordersPath = path.resolve("Client/data/orders.json");




// POST /orders - Crear una nueva orden (base de datos)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { cartItems, coupon = null, total } = req.body;
    const user = req.user;

    // Validaciones mínimas
    if (!user || !user.id || !user.firstName || !user.email) {
      return res.status(400).json({ message: "Datos de usuario inválidos." });
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Debe haber al menos un producto en la orden." });
    }

    if (typeof total !== "number" || total <= 0) {
      return res.status(400).json({ message: "Total inválido." });
    }

    const products = cartItems
      .filter((item) => item.product || item._id || item.id)
      .map((item) => ({
        product: item.product || item._id || item.id,
        quantity: item.quantity,
      }));

    if (products.length !== cartItems.length) {
      return res.status(400).json({
        message: "Algunos productos no contienen ID válido para MongoDB.",
      });
    }


    const newOrder = await createOrder({
      user: user.id, // o user._id si ya viene así
      products,
      coupon,
      total,
    });

    res.status(201).json({
      message: "Orden creada exitosamente",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error al crear orden:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});



export default router;