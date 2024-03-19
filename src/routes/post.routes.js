
import { Router } from "express";
import { createPost, deletePostById, getAllPosts, getOwnPosts, getPostById, likeAPost, showTimeline, updatePostById, } from "../controllers/postControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router()

router.get("/timeline", auth, showTimeline)
router.get("/", auth, getAllPosts)
router.post("/", auth, createPost)
router.put("/", auth, updatePostById)
router.put("/like/:_id", auth, likeAPost)
router.get("/own", auth, getOwnPosts)
router.delete("/:_id", auth, deletePostById)
router.get("/:_id", auth, getPostById)


export default router