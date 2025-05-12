import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";

// Ruta absoluta al archivo JSON
const filePath = path.resolve("Client/data/users.json");

const router= Router()

let fileUsers = await readFile(filePath, "utf-8");
let userData = JSON.parse(fileUsers);

//definición de rutas

/*
// GET para obtener todos los usuarios (act de prueba)
router.get("/", async (req, res) => {
    try {
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ message: "Error al leer usuarios", error });
    }
});
*/
// GET para obtener un usuario por id (act de prueba)
/*
router.get("/byId/:id", async (req, res) => {
    try{
        const id= parseInt(req.params.id)

        const result = userData.find(e => e.id == id)

        if (result) {
                res.status(200).json(result)
        }
        else{
            res.status(400).json(`Usuario con id: ${id} no encontrado`)
        }

    } catch (error){
        res.status(500).json({ message: "Error al buscar usuario", error });
    }
});
*/

// POST para crear un nuevo usuario con validación de email duplicado
router.post("/registro", async (req, res) => {
  try {
    const { firstName, lastName, email, password, birthDate } = req.body;

    // Validar que todos los campos estén presentes
    if (!firstName || !lastName || !email || !password || !birthDate) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Validar email duplicado
    const exists = userData.find((u) => u.email === email);
    if (exists) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const newUser = {
      id: userData.length > 0 ? userData[userData.length - 1].id + 1 : 1,
      firstName,
      lastName,
      email,
      password,
      birthDate,
    };

    userData.push(newUser);
    await writeFile(filePath, JSON.stringify(userData, null, 2));

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
});


// POST para login del usuario 
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = userData.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            res.status(200).json({ message: "Login exitoso", user });
        } else {
            res.status(401).json({ message: "Email o contraseña incorrectos" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en login", error });
    }
});

// PUT para actualizar usuario (actividad de prueba)
/*
router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { firstName, lastName, email, password, birthDate } = req.body;

        const index = userData.findIndex((u) => u.id === id);
        if (index === -1) {
            return res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
        }

        userData[index] = {
            ...userData[index],
            firstName,
            lastName,
            email,
            password,
            birthDate,
        };

        await writeFile(
            "Client/data/users.json",
            JSON.stringify(userData, null, 2)
        );
        res.status(200).json(userData[index]);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario", error });
    }
});
*/
//DELETE para eliminar usuario (actividad de prueba)
/*
router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const index = userData.findIndex((u) => u.id === id);
        if (index === -1) {
            return res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
        }

        userData.splice(index, 1); // eliminación
        await writeFile("Client/data/users.json",JSON.stringify(userData, null, 2)
        );

        res.status(200).json({ message: `Usuario con ID ${id} eliminado` });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario", error });
    }
});
*/

export default router;