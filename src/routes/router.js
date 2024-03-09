import { Router } from "express";
import AuthRoutes from "./auth.routes.js"
import userRoutes from "./user.routes.js"

const router = Router()

router.use("/auth", AuthRoutes)
router.use("/users", userRoutes)


export default router