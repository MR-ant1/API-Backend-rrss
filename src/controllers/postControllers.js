
import { handleError } from "../utils/handleError.js";
import Post from "../models/Post.js"
import User from "../models/User.js";


export const getAllPosts = async (req, res) => {
    try {
        const postsList = await Post.find()

        if (!postsList) {
            throw new Error("There is no posts yet")
        }

        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: postsList
        })
    } catch (error) {
        if (error.message === "There is no posts yet") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "Cant retrieve posts", 500)
    }

}

export const getPostById = async (req, res) => {
    try {

        const postId = req.params._id
        const postsById = await Post.findOne(
            {
                _id: postId
            }
        )

        if (!postsById) {
            throw new Error("Post not found")
        }

        res.status(200).json({
            success: true,
            message: "Post retrieved successfully",
            data: postsById
        })
    } catch (error) {
        if (error.message === "Post not found") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "Cant retrieve posts", 500)
    }
}

export const getOwnPosts = async (req, res) => {
    try {

        const userId = req.tokenData.userId
        const ownPosts = await Post.find(
            {
                userId: userId
            }
        )

        if (ownPosts.length === 0) {
            throw new Error("You dont have any posts yet") //ME CRASHEA SERVER SI NO HAY POSTS
        }

        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: ownPosts
        })
    } catch (error) {
        if (error.message === "You dont have any posts yet") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "Cant retrieve posts", 500)
    }
}


export const getOtherUserPosts = async (req, res) => {
    try {
        const userId = req.params.userId
        const otherUserPosts = await Post.find(
            {
                userId
            }
        )

        if (otherUserPosts.length === 0) {
            throw new Error("This user doesnt have any post yet")
        }

        res.status(200).json({
            success: true,
            message: "User's post retrieved successfully",
            data: otherUserPosts
        })
    } catch (error) {
        if (error.message === "This user doesnt have any post yet") {
            return handleError(res, error.message, 404)
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
                title: title,
                description: description,
                userId: userId
            }
        )

        res.status(201).json({
            success: true,
            message: "Post crated succesfully!",
            data: newPost
        })
    } catch (error) {
        if (error.message === "You need to login to create a post") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "Title is mandatory") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant create post", 500)
    }
}

export const updatePostById = async (req, res) => {

    try {
        const userUpdating = req.tokenData.userId
        const postId = req.body.postId
        const { title, description } = req.body

        if (!postId) {
            throw new Error("You need to choose one post to edit!")
        }

        const updatedPost = await Post.findOneAndUpdate(
            {
                _id: postId,
                userId: userUpdating

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
            data: updatedPost
        })
    } catch (error) {
        if (error.message === "You need to choose one post to edit!") {
            return handleError(res, error.message, 400)
        }
        if (error.message === "You cant update another users post") {
            return handleError(res, error.message, 400)
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
                _id: postId,
                userId: userUpdating
            }
        )
        if (deletedPost === null) {
            throw new Error("There isnt a post to delete")
        }

        res.status(200).json({
            success: true,
            message: "Post deleted succesfully",
            data: deletedPost
        })
    } catch (error) {
        if (error.message === "There isnt a post to delete") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant delete post", 500)
    }
}

export const likeAPost = async (req, res) => {
    try {
        const userId = req.tokenData.userId
        const postId = req.params._id

        const userLiking = await User.findOne(
            {
                _id:userId
            }
        )
  
        userLiking.likedPosts.push(postId)
        await userLiking.save()
       

        const postLiked = await Post.findOne(
            {
                _id: postId
            }
        )
        if (!postLiked) {
            throw new Error("Post not found")
        }
          
        postLiked.likes.push(userId)
        await postLiked.save()
        console.log(postLiked.likes)

        if (userLiking.likedPosts.includes(postId)) {
             const idIndex = userLiking.likedPosts.pull(postId)
        }
        if (postLiked.likes.includes(userId)) {
             postLiked.likes.pull(userId)
        }

        res.status(200).json({
            success: true,
            message: "You liked this post!"
           
        })
    } catch (error) {
        console.log(error)
        if (error.message === "Post not found") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "Cant like post", 500)
    }
}