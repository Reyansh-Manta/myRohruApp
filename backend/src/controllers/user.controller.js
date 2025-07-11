import { User } from '../models/user.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiErrors.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import { createClient } from 'redis'

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

const sendOtp = asyncHandler(async (req, res) => {

    try {

        const client = createClient();
        await client.connect();

        const number = await client.get('userNumber');

        if (!number) {
            throw new ApiError(400, 'phone number not recieved in sendOtp middleware');
        }

        const { OrignalOtp, OrignalOtpCreatedAt } = await generateOTP();

        if (!OrignalOtp || !OrignalOtpCreatedAt) {
            throw new ApiError(500, 'Failed to generate OTP');
        }

        await client.setEx(otp, 300, JSON.stringify(OrignalOtp))
        await client.setEx(otpCreatedAt, 300, JSON.stringify(OrignalOtpCreatedAt))

        return res
            .status(200)
            .json(new ApiResponse(200, { otp: OrignalOtp }, 'OTP sent successfully'));


    } catch (error) {
        throw new ApiError(500, 'Internal Server Error', error.message);
    }

})

const ResendOtp = asyncHandler(async (req, res) => {
    try {

        const client = createClient();
        await client.connect();

        const num = await client.get('userNumber');

        if (!num) {
            throw new ApiError(400, 'Phone number is required');
        }

        const { otp, otpCreatedAt } = generateOTP();

        if (!OrignalOtp || !OrignalOtpCreatedAt) {
            throw new ApiError(500, 'Failed to generate OTP');
        }

        await client.setEx(otp, 300, JSON.stringify(OrignalOtp))
        await client.setEx(otpCreatedAt, 300, JSON.stringify(OrignalOtpCreatedAt))

        return res
            .status(200)
            .json(new ApiResponse(200, { otp: OrignalOtp }, 'OTP sent successfully'));

    }
    catch (error) {
        return res.status(500).json(new ApiError(500, 'Internal Server Error in resendOtp', error.message));
    }
})

const verifyOtp = asyncHandler(async (req, res, next) => {

    while (true) {
        const { userotp } = req.body

        const client = createClient();
        await client.connect();

        const otp = await client.get('otp');
        const otpCreatedAt = await client.get('otpCreatedAt');
        const phoneNumber = await client.get('userNumber');


        if (!otp || !otpCreatedAt) {
            throw new ApiError(400, 'OTP not found or expired');
        }

        if (!userotp) {
            throw new ApiError(400, 'OTP is required');
        }

        const otpCheck = isOTPValid(userotp, otp, otpCreatedAt);

        const count = 0
        count++

        const isExpired = (Date.now() - otpCreatedAt) > (10 * 60 * 500)

        if (otpCheck) {
            return res
                .status(200)
                .json(new ApiResponse(200, {}, 'OTP verified successfully'));
        }
        else {
            if (isExpired) {
                await User.findOneAndDelete({ phoneNumber: phoneNumber })
                deleteFromCloudinary(User.findOne({ phoneNumber: phoneNumber }).profilePicture);
                return res
                    .status(400)
                    .json(new ApiError(400, 'OTP expired, please register again'));
            }
        }

    }
})

export {
    getNumber,
    registerUser,
    sendOtp,
    ResendOtp,
    verifyOtp
}