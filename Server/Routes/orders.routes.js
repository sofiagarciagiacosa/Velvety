import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

const router = Router();

const ordersPath = path.resolve("Client/data/orders.json");

const generarIdUnico = () => crypto.randomUUID();

// POST /orders - Crear una nueva orden
router.post("/", async (req, res) => {
    const { user, cartItems, coupon = null, total } = req.body;


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

  try {
    // Leer órdenes anteriores
    const data = await readFile(ordersPath, "utf-8");
    const orders = JSON.parse(data);

    // Crear nueva orden
    const newOrder = {
      id: generarIdUnico(),
      user,
      cartItems,
      coupon,
      total,
      createdAt: new Date().toISOString()
    };

    // Agregar la nueva orden y guardar
    orders.push(newOrder);
    await writeFile(ordersPath, JSON.stringify(orders, null, 2));

    // Responder con éxito
    res.status(201).json({ message: "Orden creada", orderId: newOrder.id });

  } catch (error) {
    console.error("Error al guardar orden:", error);
    res.status(500).json({ message: "Error al guardar la orden." });
  }
});


export default router;