import { Router } from "express";
import { createPost, getPostById, getPosts } from "../controllers/postControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router()

router.get("/", auth, getPosts)
router.post("/", auth, createPost)
router.get("/:_id", auth, getPostById)



export default router