
import User from "../models/User.js";
import { handleError } from "../utils/handleError.js";
import bcrypt from "bcrypt"



export const getUsers = async (req, res) => {
    try {
        const userList = await User.find()

        if (!userList) {
            throw new Error("There is no users")
        }

        res.status(200).json({
            success: true,
            message: "Users retrieved succesfully",
            data: userList

        })

    } catch (error) {
        if (error.message === "There is no users") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "Cant retrieve users", 500)
    }
}

export const getProfile = async (req, res) => {

    try {
        const userId = req.tokenData.userId

        const userProfile = await User.findOne(
            {
                _id: userId
            },
            {
                password: false
            }
        )

        res.status(200).json({
            success: true,
            message: "Profile retrieved succesfully",
            data: userProfile
        })

    } catch (error) {
        handleError(res, "Cant retrieve users", 500)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.tokenData.userId
        const { firstName, lastName, email } = req.body;

        if (!userId) {
            throw new Error("Login to update profile")
        }

        const updatedProfile = await User.findOneAndUpdate(
            {
                _id: userId
            },
            {
                firstName,
                lastName,
                email
            },
            {
                new: true
            }
        )

        if (email) {
            const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

            if (!validEmail.test(email)) {
                throw new Error("Email format is not valid")
            }
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedProfile
        })

    } catch (error) {
        if (error.message === "Login to update profile") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "Email format is not valid") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant update profile", 500)
    }
}

export const deleteUserById = async (req, res) => {

    try {
        const userId = req.params._id

        if (!userId) {
            throw new Error("There is no user with that ID")
        }

        const deletedUser = await User.findByIdAndDelete(
            {
                _id: userId
            }
        )
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deletedUser
        })
    } catch (error) {
        if (error.message === "There is no user with that ID") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "Cant delete user", 500)
    }

}

export const followUser = async (req, res) => {
    try {
        const userId = req.tokenData.userId
        const followedUser = req.params._id

        const Follower = await User.findOne(
            {
                _id: userId
            }
        )

        if (Follower.following.includes(followedUser)) {
            const followIndex = Follower.following.indexOf(followedUser)
            Follower.following.splice(followIndex, 1)
            await Follower.save()

        } else
            Follower.following.push(followedUser)
        await Follower.save()


        const userFollowed = await User.findOne(
            {
                _id: followedUser
            }
        )

        if (!followedUser) {
            throw new Error("User not found")
        }

        if (userFollowed.followedBy.includes(userId)) {
            const followIndex = userFollowed.followedBy.indexOf(userId)
            userFollowed.followedBy.splice(followIndex, 1)
            await userFollowed.save()

            return res.status(200).json({
                success: true,
                message: "Unfollowed"

            })
        } else

            userFollowed.followedBy.push(userId)
        await userFollowed.save()


        res.status(200).json({
            success: true,
            message: "Followed!"

        })

    } catch (error) {
        console.log(error)
        if (error.message === "User not found") {
            return handleError(res, error.message, 404)
        }
        handleError(res, "Cant follow user", 500)
    }
}

