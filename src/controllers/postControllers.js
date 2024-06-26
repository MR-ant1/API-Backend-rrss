
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

        if (!ownPosts) {
            throw new Error("You dont have any posts yet")
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
        const authorFirstName = req.tokenData.authorFirstName
        const authorLastName = req.tokenData.authorLastName
        const { title, description } = req.body;
       
        if (!userId ) {
            throw new Error("You need to login to create a post")
        }
        if (!title || !description) {
            throw new Error("All fields are required")
        }
        const newPost = await Post.create(
            {
                title: title,
                description: description,
                userId: userId,
                authorFirstName: authorFirstName,
                authorLastName: authorLastName
            }
        )

        res.status(201).json({
            success: true,
            message: "Post created succesfully!",
            data: newPost
        })
        
    } catch (error) {
        if (error.message === "You need to login to create a post") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "All fields are required") {
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
            message: "Post updated successfully",
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
                _id: userId
            }
        )

        if (userLiking.likedPosts.includes(postId)) {
            const idIndex = userLiking.likedPosts.indexOf(postId)
            userLiking.likedPosts.splice(idIndex, 1)
            await userLiking.save()         
                                        //Arriba se comprueba si el usuario ya dispone de ese post en sus likes y se retira como unliken. Si no se añade como like.
        } else
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

        if (postLiked.likes.includes(userId)) {
            const userIdIndex = postLiked.likes.indexOf(userId)
            postLiked.likes.splice(userIdIndex, 1)
            await postLiked.save()
                                        //Aqui arriba comprobamos si ya tiene el like de ese usuario en su array y se retira. De no ser asi, se añade nuevo like.
            return res.status(200).json({
                success: true,
                message: "Dislike",
                data: postLiked
            })
        } else

            postLiked.likes.push(userId)
        await postLiked.save()


        res.status(200).json({
            success: true,
            message: "Like",
            data: postLiked
        })

    } catch (error) {
        console.log(error)
        if (error.message === "Post not found") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "Cant like post", 500)
    }
}

export const showTimeline = async (req, res) => {
    try {
        const userSearching = req.tokenData.userId

        const userFollows = await User.findById(
            {
                _id: userSearching              //Buscamos el usario del token para después poder utilizar los usarios que contenga en "following"
            }
        )
        const followingIds = userFollows.following

        const timeline = await Post.find(
            {
                userId: followingIds         //buscamos posts donde el id del author coincida con los Id's obtenidos del token del usuario que realiza la busqueda
            }
        )

        if (timeline.length === 0) {
            throw new Error("You dont follow anybody yet")
        }

        res.status(200).json({
            success: true,
            message: "Timeline retrieved successfully",
            data: timeline
        })
    } catch (error) {
        if (error.message === "You dont follow anybody yet") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "Cant retrieve timeline", 500)
    }
}