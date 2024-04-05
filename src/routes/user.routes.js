
import { Router } from "express";
import { deleteUserById, followUser, getProfile, getUsers, updateProfile, updateRol } from "../controllers/userControllers.js";
import { auth } from "../middlewares/auth.js"
import { isSuperAdmin } from "../middlewares/isSuperAdmin.js";
import { getOtherUserPosts } from "../controllers/postControllers.js";

const router = Router()

//Final de las rutas de endpoints de users
router.get("/", auth, isSuperAdmin, getUsers)
router.get("/profile", auth, getProfile)
router.get("/posts/:userId", auth, getOtherUserPosts)
router.put("/profile", auth, updateProfile)
router.delete("/:_id", auth, isSuperAdmin, deleteUserById)
router.put("/follow/:_id", auth, followUser)
router.put("/:_id/role", auth, isSuperAdmin, updateRol)

export default router