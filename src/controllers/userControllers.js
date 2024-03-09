
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
            handleError(res, error.message, 404)
        }
        handleError(res, "Cant retrieve users", 500)
    }
}

export const getProfile = async (req, res) => {
    try {

        const userId = req.tokenData.userId
       
        const userProfile = await User.findOne(
            {
                _id:userId
            },
            {
                password: false
            }
        )
        
        res.status(200).json({
            success: true,
            message: "Profile retrieved succesfully",
            data:userProfile
        })

    } catch (error) {
        handleError(res, "Cant retrieve users", 500)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.tokenData.userId
        const { firstName, lastName, email, password } = req.body;
       

        const passwordEncrypted = bcrypt.hashSync(password, 8)


        if (!userId) {
            throw new Error("Login to update profile")
        }

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
           throw new Error("Email format is not valid")
        }
            
        const updatedProfile = await User.findByIdAndUpdate(
            {
                _id: userId
            },
            {
               firstName,
               lastName,
               email,
               password: passwordEncrypted
            },
            {
                new:true
            }
        )
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedProfile
        })

    } catch (error) {
        if (error.message === "Login to update profile") {
            handleError(res, error.message, 404)
        }
        if (error.message === "Email format is not valid") {
            handleError(res, error.message, 400)
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
                handleError(res, error.message, 404)
            }
            handleError(res, "Cant delete user", 500)
        }
    
}
