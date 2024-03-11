import jwt from "jsonwebtoken"
import { handleError } from "../utils/handleError.js"

export const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            throw new Error("Couldn't authentify user")
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.tokenData = decoded

        next()
    } catch (error) {
        if (error.message === "Couldn't authentify user") {
            handleError(res, error.message, 400)
        }
        handleError(res, "Cant authentificate user", 500)
    }
}