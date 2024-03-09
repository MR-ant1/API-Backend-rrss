import bcrypt from "bcrypt"
import User from "../models/User.js"
import jwt from "jsonwebtoken";
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
    
        const encryptedPassword = bcrypt.hashSync(password, 8)

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

export const login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            throw new Error ("email and password are mandatories")
        }

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email format is not valid"
                }
            )
        }
              
        const user = await User.findOne(
            {
                    email: email
            })

        if (!user) {
            throw new Error("Email or password invalid")
        }

        const isValidPassword = bcrypt.compareSync(password, user.password)

        if (!isValidPassword) {
            throw new Error("Email or password invalid")
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "200h" //bajar despues tiempo
            }
        )

        res.status(200).json({
            success: true,
            message: "User logged succesfully",
            token: token 
        })

    } catch (error) {

        if (error.message === "email and password are mandatories") {
            handleError(res, error.message, 400)
        }
        if (error.message === "Email format is not valid") {
            handleError(res, error.message, 400)
        }
        if (error.message === "Email or password invalid") {
            handleError(res, error.message, 400)
        }
        handleError(res, "Cant login", 500)
    }
}