
import mongoose from "mongoose";
import "dotenv/config"

export const dbconnection = () => {
    return mongoose.connect(
        process.env.MONGO_URI, {}
    )
}