import { Router } from "express";
import { createPost, getPosts } from "../controllers/postControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router()

router.get("/", getPosts)
router.post("/", auth, createPost)



export default router