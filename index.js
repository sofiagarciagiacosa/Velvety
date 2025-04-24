import express from "express"
import dotenv from "dotenv"
import usersRouter from "./Server/Routes/users.routes.js"
import productsRouter from "./Server/Routes/products.routes.js"
import couponsRouter from "./Server/Routes/coupons.routes.js"

//traer variables de entorno
dotenv.config()

//crear instancia
const app = express()

//configurar puerto
const port = process.env.PORT || 3000

//para poder leer json
app.use(express.json());

//levantar el servidor
app.listen(port, ()=>{
    console.log(`Servidor levantado en puerto ${port}`)
})

//rutas de usuarios
app.use("/user", usersRouter)
app.use("/product", productsRouter)
app.use("/coupon", couponsRouter )

