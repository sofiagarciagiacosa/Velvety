import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import { findByEmail, createUser } from "../db/actions/user.actions.js";

dotenv.config();


const router= Router()


// Migrando a Base De Datos

// Registro de usuario
router.post("/registro", async (req, res) => {
  try {
    const { firstName, lastName, email, password, birthDate } = req.body;

    if (!firstName || !lastName || !email || !password || !birthDate) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const existingUser = await findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      birthDate,
    });

    const token = jwt.sign(
      { id: newUser._id, firstName: newUser.firstName, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(201).json({
      message: "Usuario creado exitosamente",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        birthDate: newUser.birthDate,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error: error.message });
  }
});

// Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user._id, firstName: user.firstName, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        lastName: user.lastName,
        birthDate: user.birthDate,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
});


export default router;