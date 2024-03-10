import { Router } from "express";
import { createPost, getAllPosts, getOwnPosts, getPostById, updatePostById,  } from "../controllers/postControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router()

router.get("/", auth, getAllPosts)
router.post("/", auth, createPost)
router.put("/", auth, updatePostById)
router.get("/own", auth, getOwnPosts)
router.get("/:_id", auth, getPostById)

export default router