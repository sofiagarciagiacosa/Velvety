import { Router } from "express";
import { readFile, writeFile } from "fs/promises";

const fileUsers = await readFile("Client/data/users.json", "utf-8");
const userData = JSON.parse(fileUsers);

const router= Router()

//definición de rutas

// GET para obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ message: "Error al leer usuarios", error });
    }
});

// GET para obtener un usuario por id
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

// POST para crear un nuevo usuario
router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email, password, birthDate } = req.body;

        const newUser = {
            id: userData.length > 0 ? userData[userData.length - 1].id + 1 : 1,
            firstName,
            lastName,
            email,
            password,
            birthDate,
        };

        userData.push(newUser);
        await writeFile(
            "Client/data/users.json",
            JSON.stringify(userData, null, 2)
        );

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

// PUT para actualizar usuario
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

//DELETE para eliminar usuario
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


export default router;