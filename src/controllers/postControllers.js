import { handleError } from "../utils/handleError.js";
import Post from "../models/Post.js"


export const createPost = async (req, res) => {
    try {
        
        const userId = req.tokenData.userId;
        const { title, description } = req.body;

        if (!userId) {
            throw new Error("User not found")
        }
        if (!title) {
            throw new Error("Title is mandatory")
        }

        const newPost = await Post.create(
            {
                title:title,
                description:description,
                userId:userId
            }
        )

        res.status(201).json({
            success: true,
            message: "Post crated succesfully!",
            data: newPost
        })
    } catch (error) {
        if (error.message === "User not found") {
            handleError(res, error.message, 404)
        }
        if (error.message === "Title is mandatory") {
            handleError(res, error.message, 400)
        }
        handleError(res, "Cant retrieve users", 500)
    }
}