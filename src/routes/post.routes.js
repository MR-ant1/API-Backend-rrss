import { Router } from "express";
import { createPost, deletePostById, getAllPosts, getOwnPosts, getPostById, updatePostById,  } from "../controllers/postControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router()

router.get("/", auth, getAllPosts)
router.post("/", auth, createPost)
router.put("/", auth, updatePostById)
router.get("/own", auth, getOwnPosts)
router.delete("/:_id", auth, deletePostById)
router.get("/:_id", auth, getPostById)

export default router