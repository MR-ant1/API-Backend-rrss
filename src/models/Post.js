
import { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        userId: {
            type: String,
            required: true
        },
        likes: [
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

const Post = model ("Post", postSchema)
export default Post