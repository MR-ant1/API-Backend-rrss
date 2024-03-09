import { Router } from "express";
import { getUsers } from "../controllers/userControllers.js";

const router = Router()

router.get("/", getUsers)


export default router