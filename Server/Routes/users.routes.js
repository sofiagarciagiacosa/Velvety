import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

// Ruta absoluta al archivo JSON
const filePath = path.resolve("Client/data/users.json");

const router= Router()

let fileUsers = await readFile(filePath, "utf-8");
let userData = JSON.parse(fileUsers);

//definición de rutas

// POST para crear un nuevo usuario con validación de email duplicado
router.post("/registro", async (req, res) => {
  try {
    const { firstName, lastName, email, password, birthDate } = req.body;

    // Validar que todos los campos estén presentes
    if (!firstName || !lastName || !email || !password || !birthDate) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Validar email duplicado
    const exists = userData.find((u) => u.email === email);
    if (exists) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: userData.length > 0 ? userData[userData.length - 1].id + 1 : 1,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      birthDate,
    };

    userData.push(newUser);
    await writeFile(filePath, JSON.stringify(userData, null, 2));

    const token = jwt.sign(
      { id: newUser.id, firstName: newUser.firstName, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      message: "Usuario creado exitosamente",
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        birthDate: newUser.birthDate,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
});


// POST para login del usuario 
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
          return res
            .status(400)
            .json({ message: "Email y contraseña son obligatorios" });
        }
        const user = userData.find((u) => u.email === email);
        if (!user) {
          return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: "Credenciales inválidas" });
        }
        const token = jwt.sign(
          { id: user.id, firstName: user.firstName, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        res.status(200).json({
          message: "Inicio de sesión exitoso",
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            email: user.email,
            lastName: user.lastName,
            birthDate: user.birthDate,
          },
        });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
});



export default router;