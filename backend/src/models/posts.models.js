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
            type: String,
            enum: ['local-feed', 'general-announcements', 'events', 'weather-and-roads', 'orchards', 'tips-for-tourists', 'must-visit-locations', 'accomodation-and-local-facilities'],
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