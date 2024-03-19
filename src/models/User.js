
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
        likedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        followedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

    //Campos "followedBy" y "following" son creados para albergar cada uno en un array tanto quien sigue como a quien sigue cada usuario.
const User = model("User", UserSchema)
export default User