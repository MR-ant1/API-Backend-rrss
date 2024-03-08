import mongoose from "mongoose";

export const dbconnection = () => {
    return mongoose.connect(
        process.env.MONGO_URI,
        {}
    )
}