import { Router } from "express";
import { deleteUserById, getUsers } from "../controllers/userControllers.js";

const router = Router()

router.get("/", getUsers)
router.delete("/:_id", deleteUserById)


export default router