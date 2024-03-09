import { Router } from "express";
import { deleteUserById, getProfile, getUsers, updateProfile } from "../controllers/userControllers.js";
import { auth } from "../middlewares/auth.js"

const router = Router()

router.get("/", auth, getUsers)
router.get("/profile", auth, getProfile)
router.put("/profile", auth, updateProfile)
router.delete("/:_id", deleteUserById)


export default router