import jwt from "jsonwebtoken"
import { handleError } from "../utils/handleError.js"

export const isSuperAdmin = (req, res, next) => {
    try {
        if (req.tokendata.role !== "super_admin")
        throw new Error("Unauthorized")

        next()
    } catch (error) {
        // if (error.message === "Unauthorized") {
        //     handleError(res, error.message, 400)
        // }
        handleError(res, "Unathorized", 500)
    }
}