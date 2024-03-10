import { handleError } from "../utils/handleError.js";
import Post from "../models/Post.js"


export const getAllPosts = async (req, res) => {
    try {
        const postsList = await Post.find()

    if(!postsList) {
        throw new Error("There is no posts yet")
    }

    res.status(200).json({
        success: true,
        message: "Posts retrieved successfully",
        data: postsList
    })
    } catch (error) {
        if (error.message === "There is no posts yet") {
            handleError(res, error.message, 404)
        }
        handleError(res, "Cant retrieve posts", 500)
    }
    
}

export const getPostById = async (req, res) => {
    try {

        const postId = req.params._id
        const postsById = await Post.findOne(
            {
                _id:postId
            }
        )

        if(!postsById) {
            throw new Error("Post not found")
        }
    
        res.status(200).json({
            success: true,
            message: "Post retrieved successfully",
            data: postsById
        })
    } catch (error) {
        if (error.message === "Post not found") {
            handleError(res, error.message, 404)
        }
        handleError(res, "Cant retrieve posts", 500)
    }
}

export const getOwnPosts = async (req, res) => {
    try {

        const userId = req.tokenData.userId
        const ownPosts = await Post.find(
            {
                userId:userId
            }
            )

        if(ownPosts.length === 0) {
            throw new Error("You dont have any posts yet") //ME CRASHEA SERVER SI NO HAY POSTS
        }
    
        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: ownPosts
        })
    } catch (error) {
        if (error.message === "You dont have any posts yet") {
            handleError(res, error.message, 404)
        }
        handleError(res, "Cant retrieve posts", 500)
    }
}


export const getOtherUserPosts = async (req, res) => {
    try {
        const userId = req.params.userId
        const otherUserPosts= await Post.find(
            {
                userId
            }
        )

        if(otherUserPosts.length === 0) {
            throw new Error("This user doesnt have any post yet")
        }

        res.status(200).json({
            success: true,
            message: "User's post retrieved successfully",
            data: otherUserPosts
        })
    } catch (error) {
        if (error.message === "This user doesnt have any post yet") {
            handleError(res, error.message, 404)
        }
        handleError(res, "Cant retrieve posts", 500) 
    }
}

export const createPost = async (req, res) => {
    try {
        
        const userId = req.tokenData.userId;
        const { title, description } = req.body;

        if (!userId) {
            throw new Error("You need to login to create a post")
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
        if (error.message === "You need to login to create a post") {
            handleError(res, error.message, 404)
        }
        if (error.message === "Title is mandatory") {
            handleError(res, error.message, 400)
        }
        handleError(res, "Cant create post", 500)
    }
}

export const updatePostById = async (req,res) => {

    try {
       const userUpdating = req.tokenData.userId 
       const postId = req.body.postId
       const {title, description} = req.body

       if(!postId) {
        throw new Error("You need to choose one post to edit!")
       }

        const updatedPost = await Post.findOneAndUpdate(
            {
                _id:postId,
                userId:userUpdating

            },
            {
                title,
                description
            },
            {
                new: true
            }
        )
        if (updatedPost === null) {
            throw new Error("You cant update another users post")
        }

        res.status(200).json({
            successs: true,
            messsage: "Post updated successfully",
            data:updatedPost
        })
    } catch (error) {
        if (error.message === "You need to choose one post to edit!") {
            handleError(res, error.message, 400)
        }
        if (error.message === "You cant update another users post") {
            handleError(res, error.message, 400)
        }
        handleError(res, "Cant update post", 500)
    }
}

export const deletePostById = async (req, res) => {
    try {
        const userUpdating = req.tokenData.userId
        const postId = req.params._id
        const deletedPost = await Post.findOneAndDelete(
            {
                _id:postId
            },
            {
                userId:userUpdating
            }
            )
        if (!deletedPost) {
            throw new Error("There isnt a post with this Id")
        }

        res.status(200).json({
            success: true,
            message: "Post deleted succesfully",
            data: deletedPost
        })
    } catch (error) {
        if (error.message === "There isnt a post with this Id") {
            handleError(res, error.message, 400)
        }
        handleError(res, "Cant delete post", 500)
    }
}