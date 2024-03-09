import { Router } from "express";
import { deleteUserById, getUsers } from "../controllers/userControllers.js";
import { auth } from "../middlewares/auth.js"

const router = Router()

router.get("/", auth, getUsers)
router.delete("/:_id", deleteUserById)


export default router