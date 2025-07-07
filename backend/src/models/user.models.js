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
        }

    },
    { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    
    this.password = await bcrypt.hash(this.password, 10)    
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            fullName: this.fullName,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateOTP = function() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otp = otp.padStart(6, '0'); // Ensure OTP is 6 digits
}
        


export const User = mongoose.model("User", userSchema);
