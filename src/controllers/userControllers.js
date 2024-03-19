
import User from "../models/User.js";
import { handleError } from "../utils/handleError.js";

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

        //Buscamos un usuario que coincida con el UserId del token y lo mostramos al ser el propio perfil del usuario
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
        //Se valida el formato del nuevo correo para no poder añadir valores erroneos.      
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

        const userFollowed = await User.findOne(
            {
                _id: followedUser
            }
        )

        //Debería salir este error si se introduce mal un Id en params. pero, aunque no lo añade y da error 500, no salta este mensaje como debería
        if (!userFollowed) {
            throw new Error("This user doesn't exists")
        }

        if (userFollowed.followedBy.includes(userId)) {
            const followIndex = userFollowed.followedBy.indexOf(userId)
            userFollowed.followedBy.splice(followIndex, 1) //Si el id del usuario seguido ya encuentra en su array al seguidor, lo elimina haciendose unfollow
            await userFollowed.save()

            return res.status(200).json({
                success: true,
                message: "Unfollowed"

            })
        } else
            userFollowed.followedBy.push(userId)
        await userFollowed.save()


        const follower = await User.findOne(
            {
                _id: userId
            }
        )

        if (follower.following.includes(followedUser)) {
            const followIndex = follower.following.indexOf(followedUser)
            follower.following.splice(followIndex, 1)
            await follower.save() //Busca si el seguidor ya tiene al usuario seguido en su lista y si es asi, busca su indice en el array y lo elimina.

        } else
            follower.following.push(followedUser)   // Si la sentencia anterior no se cumple, entonces añade el id del usuario seguido al array de gente seguida
        await follower.save()


        res.status(200).json({
            success: true,
            message: "Followed!"

        })

    } catch (error) {
        console.log(error)
        if (error.message === "This user doesn't exists") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant follow user", 500)
    }
}

export const updateRol = async (req, res) => {
    try {
        const userId = req.tokenData.userId
        const userUpdated = req.params._id
        const newRole = req.body.role

        if (!userId) {
            throw new Error("Login to update role")
        }

        const updatedRol = await User.findOneAndUpdate(
            {
                _id: userUpdated
            },
            {
                role: newRole
            },
            {
                new: true
            }
        )

        if (newRole === "user" || newRole === "admin" || newRole === "super_admin") {
            res.status(200).json({
                success: true,
                message: "Role updated successfully",
                data: updatedRol
            })
        } else throw new Error("Role must have a valid name")




    } catch (error) {
        if (error.message === "Login to update role") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "Role must have a valid name") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Couldnt update role", 500)
    }
}