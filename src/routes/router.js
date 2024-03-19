
import { Router } from "express";
import AuthRoutes from "./auth.routes.js"
import userRoutes from "./user.routes.js"
import postRoutes from "./post.routes.js"

const router = Router()

//Continuación de las rutas iniciadas en "Server" con "/api". Aqui se perfilan hacia un tipo de ruta determinado (users, posts, auth)
router.use("/auth", AuthRoutes)
router.use("/users", userRoutes)
router.use("/posts", postRoutes)


export default router