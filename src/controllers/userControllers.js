
import User from "../models/User.js";
import { handleError } from "../utils/handleError.js";

export const getUsers = async (req, res) => {
    try {
        const userList = await User.find()
        .select("-password")
        //PENDING SHOW BOOK TITLE
        
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
