
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin", "super_admin"],
            default: "user"
        },
    //    likedPosts: [
    //         {
    //             type: Schema.Types.ObjectId,
    //             ref: 'Post'
    //         }
    //     ]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const User = model ("User", UserSchema)
export default User