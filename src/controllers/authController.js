import bcrypt from "bcrypt"
import User from "../models/User.js"
import { handleError } from "../utils/handleError.js"

export const register = async (req, res) => {
    try {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const email = req.body.email
        const password = req.body.password

        if (!firstName || !email || !password) {
            throw new Error("all fields are mandatory")
        }

        if (password.length < 8 || password.length > 20) {
            throw new Error("Password must contain between 8 and 20 characters")
        }
    
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            throw new Error("Format email invalid")
        }
    
        const encryptedPassword = bcrypt.hashSync(password, 5)

        const newUser = await User.create(
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: encryptedPassword
            }
        )
       res.status(201).json(
      {
        success: true,
        message: "User registered successfully",
        data: newUser
      }
    ) 
    } catch (error) {
        if (error.message === "all fields are mandatory") {
            handleError(res, error.message, 404)
        }
        if (error.message === "Password must contain between 8 and 20 characters") {
            handleError(res, error.message, 400)
        }
        if (error.message === "Format email invalid") {
            handleError(res, error.message, 400)
        }
        handleError(res, "Cant register user", 500)
    }
    
}

export const login = (req, res) => {
  res.status(200).json(
    {
      success: true,
      message: "Login user successfully"
    }
  )
}