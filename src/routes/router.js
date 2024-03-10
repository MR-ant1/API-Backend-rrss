
import { Router } from "express";
import AuthRoutes from "./auth.routes.js"
import userRoutes from "./user.routes.js"
import postRoutes from "./post.routes.js"

const router = Router()

router.use("/auth", AuthRoutes)
router.use("/users", userRoutes)
router.use("/posts", postRoutes)


export default router