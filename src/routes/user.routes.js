import { Router } from "express";
import { deleteUserById, getProfile, getUsers, updateProfile } from "../controllers/userControllers.js";
import { auth } from "../middlewares/auth.js"
import { isSuperAdmin } from "../middlewares/isSuperAdmin.js";

const router = Router()

router.get("/", auth, isSuperAdmin, getUsers)
router.get("/profile", auth, getProfile)
router.put("/profile", auth, updateProfile)
router.delete("/:_id", auth, isSuperAdmin, deleteUserById)


export default router