
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

        //Comprobamos que todos los campos hayan sido rellenados (lastName es opcional)
        if (!firstName || !email || !lastName || !password) {
            throw new Error("Todos los campos son obligatorios")
        }

        //Comprobación de que la contraseña tiene un tamaño adecuado y debajo de esto, comprobación del formato de correo introducido
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
                message: "Usuario creado correctamente",
                firstName:firstName,
                lastName:lastName,
                email: email
            }
        )
    } catch (error) {
        if (error.message === "Todos los campos son obligatorios") {
            return handleError(res, error.message, 404)
        }
        if (error.message === "Password must contain between 8 and 20 characters") {
            return handleError(res, error.message, 400)
        }
        if (error.message === "Format email invalid") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant register user", 500)
    }
}

export const login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            throw new Error("Se requieren todos los campos")
        }

            //Validación del formato de correo introducido
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email format is not valid"
                }
            )
        }
            //Se busca el email unico del usuario en la DB para, si existe, comparar constraseñas y comprobar si es el susodicho.
        const user = await User.findOne(
            {
                email: email
            })

        if (!user) {
            throw new Error("Email or password invalid")
        }

            //Validación de contraseña introducida donde es comparada con la almacenado en DB
        const isValidPassword = bcrypt.compareSync(password, user.password)

        if (!isValidPassword) {
            throw new Error("Email or password invalid")
        }

            //Creamos la variable token que contendrá el userId y el role de cada usuario logeado
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                authorFirstName: user.firstName,
                authorLastName: user.lastName
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "40h"
            }
        )

        res.status(200).json({
            success: true,
            message: "Usuario logueado correctamente",
            token: token
        })

    } catch (error) {

        if (error.message === "Se requieren todos los campos") {
            return handleError(res, error.message, 400)
        }
        if (error.message === "Email format is not valid") {
            return handleError(res, error.message, 400)
        }
        if (error.message === "Email or password invalid") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant login", 500)
    }
}