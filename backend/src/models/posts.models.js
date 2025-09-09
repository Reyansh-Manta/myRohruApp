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
        title: {
            type: String,
            required: true
        },
        category: {
            type: [String],
            enum: ['local-feed', 'general-announcements', 'events', 'businesses', 'orchards', 'must-visit-locations', 'facilities', 'photo-book'],
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        postedBy: {
            type: String
            }
    },
    {
        timestamps: true
    }
)

export const Post = mongoose.model("Post", postSchema);