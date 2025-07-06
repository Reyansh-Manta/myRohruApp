import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true
        },
        image: {
            type: String, // URL of the image stored in cloudinary
            required: false
        },
    },
    {
        timestamps: true
    }
)

export const Post = mongoose.model("Post", postSchema);