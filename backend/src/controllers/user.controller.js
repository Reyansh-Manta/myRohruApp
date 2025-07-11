import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/uploadOnCloudinary.js';
import {generateOTP, isOTPValid} from '../models/user.model.js';
import {createClient} from 'redis'

const getNumber = asyncHandler(async (req, res) => {
    const number = req.body
    const client = createClient()
    await client.connect()
    
    await client.setEx(userNumber, 300, JSON.stringify(number))

})

const registerUser = asyncHandler(async (req, res) => {
    const { username, fullName, email, password, village, postoffice } = req.body;

    const client = createClient();
        await client.connect();

        const phoneNumber = await client.get('userNumber');

    if (!username || !fullName || !email || !password || !phoneNumber || !village || !postoffice) {
        throw new ApiError(400, 'All fields are required');
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }, { phoneNumber }] });

    if (existingUser) {
        throw new ApiError(400, 'Username, email, or phone number already exists');
    }

    const profilePictureLocalPath = req.files?.profilePicture[0]?.path;

    if (!profilePictureLocalPath) {
        throw new ApiError(400, 'Profile picture is required');
    }

    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);
    if (!profilePicture) {
        throw new ApiError(500, 'Failed to upload profile picture');
    }


    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        phoneNumber,
        village,
        postoffice,
        profilePicture: profilePicture?.url || "",
    }).select('-password -refreshToken');

    if (!user) {
        throw new ApiError(500, 'Failed to create user');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, 'User registered successfully'));

})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    
})

export {
    registerUser
}