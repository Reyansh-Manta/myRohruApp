import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const likeSchema = new Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: false
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            required: false 
        },
    },
    {
        timestamps: true
    }
)
export const Like = mongoose.model('Like', likeSchema);