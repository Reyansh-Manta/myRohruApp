import mongoose from "mongoose";
import { Schema } from "mongoose";

const communitySchema = new Schema({
    communityScore: {
        type: Number,
        default: 0
    },
    badges: {
        type: [String], // Array of badge names
        default: []
    }
},
    { timestamps: true });