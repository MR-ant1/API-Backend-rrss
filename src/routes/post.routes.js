import { Router } from "express";
import { createPost } from "../controllers/postControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router()

router.post("/", auth, createPost)


export default router