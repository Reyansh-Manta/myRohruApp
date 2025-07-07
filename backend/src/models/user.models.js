import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        fullName: {
            type: String,
            required: true,
            index: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phoneNumber: {
          type: Number,
          required: true,
          unique: true
        },
        profilePicture: {
            type: String, //cloudinary url
        },
       
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String,
            // required: true
        },
        village: {
            type: String,
            required: true
        },
        postoffice: {
            type: String,
            required: true
        },
        communityScore: {
            type: Number,
            default: 0
        }

    },
    { timestamps: true }
)

export const User = mongoose.model("User", userSchema);
