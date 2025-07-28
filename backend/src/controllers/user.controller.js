import { User } from '../models/user.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiErrors.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import { createClient } from 'redis'
import store from '../utils/tempstorage.js';
import { generateOTP } from '../utils/generateOtp.js';
import { isOTPValid } from '../utils/isOtpValid.js';
import jwt from 'jsonwebtoken';

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Error generating Access and Refresh tokens")
    }
}

const getNumber = asyncHandler(async (req, res) => {

    const { number } = req.body
    if (!number) {
        throw new ApiError(400, 'Phone number is required');
    }

    // const client = createClient()
    // await client.connect()

    // await client.setEx(userNumber, 300, JSON.stringify(number))

    store.set('userNumber', number);

    return res
        .status(200)
        .json(new ApiResponse(200, { number }, 'Phone number received successfully'));

})

const registerUser = asyncHandler(async (req, res) => {
    const { username, fullName, email, password, village, postoffice } = req.body;

    const phoneNumber = store.get('userNumber');
    if (!username || !fullName || !email || !password || !phoneNumber || !village || !postoffice) {
        throw new ApiError(400, 'All fields are required');
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }, { phoneNumber }] });

    if (existingUser) {
        throw new ApiError(400, 'Username, email, or phone number already exists');
    }

    const profilePictureLocalPath = req.file?.path;

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
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )


    if (!createdUser) {
        throw new ApiError(500, 'Failed to create user');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createdUser, 'User registered successfully'));

})

const loginUser = asyncHandler(async (req, res) => {

    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { email, password, phoneNumber } = req.body

    if (!email && !phoneNumber) {
        throw new ApiError(404, "username or email required")
    }

    if (!password) {
        throw new ApiError(404, "password required")
    }

    const user = await User.findOne({
        $or: [{ email }, { phoneNumber }]
    })

    if (!user) {
        throw new ApiError(408, "user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(404, "incorrect user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "user logged in successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(
            200, {}, "User logged out"
        ))
})

const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "invalid refrehToken")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newrefreshToken } = await generateAccessAndRefreshTokens(user._id)

        return res
            .status(200)
            .cookie("refreshToken", newrefreshToken, options)
            .cookie("accessToken", accessToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newrefreshToken },
                    "Access token refreshed"
                )
            )

    } catch (error) {
        throw new ApiError(401, error?.message || "invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user._id)

    const oldPasswordValidation = user.isPasswordCorrect(oldPassword)

    if (!oldPasswordValidation) {
        throw new ApiError(400, "Password incorrect")
    }

    user.password = newPassword
    await user.save("ValidateBeforeSave: false")

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password updated"))

})

const getCurrentUser = asyncHandler(async (req, res) => {

    const user = req.user

    return res
        .status(200)
        .json(new ApiResponse(200, user, "fetched the current user"))
})

const updateFullName = asyncHandler(async (req, res) => {
    const { fullName } = req.body

    if (!fullName) {
        throw new ApiError(401, "fullName is required")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                fullName
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "fullName was updated"))
})

const updateEmail = asyncHandler(async (req, res) => {
    const { email } = req.body

    if (!email) {
        throw new ApiError(401, "email is required")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                email
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "email was updated"))
})

const sendOtp = asyncHandler(async (req, res) => {

    try {

        // const client = createClient();
        // await client.connect();

        // const number = await client.get('userNumber');

        const phoneNumber = store.get('userNumber');

        // console.log(phoneNumber);


        if (!phoneNumber) {
            throw new ApiError(400, 'phone number not recieved in sendOtp middleware');
        }

        const { hashedotp, createdAt, OrignalOtp } = await generateOTP();

        if (!hashedotp || !createdAt || !OrignalOtp) {
            throw new ApiError(500, 'Failed to generate OTP');
        }

        // await client.setEx(otp, 300, JSON.stringify(OrignalOtp))
        // await client.setEx(otpCreatedAt, 300, JSON.stringify(OrignalOtpCreatedAt))

        store.set('otp', hashedotp);
        store.set('otpCreatedAt', createdAt);

        return res
            .status(200)
            .json(new ApiResponse(200, { otp: OrignalOtp }, 'OTP sent successfully'));


    } catch (error) {
        throw new ApiError(500, 'Internal Server Error in sendOtp', error.message);
    }

})

const ResendOtp = asyncHandler(async (req, res) => {
    try {

        // const client = createClient();
        // await client.connect();

        // const num = await client.get('userNumber');

        const phoneNumber = store.get('userNumber');

        if (!phoneNumber) {
            throw new ApiError(400, 'Phone number is required');
        }

        const { hashedotp, createdAt, OrignalOtp } = await generateOTP();

        if (!hashedotp || !createdAt || !OrignalOtp) {
            throw new ApiError(500, 'Failed to generate OTP');
        }

        // await client.setEx(otp, 300, JSON.stringify(OrignalOtp))
        // await client.setEx(otpCreatedAt, 300, JSON.stringify(OrignalOtpCreatedAt))

        store.set('otp', hashedotp);
        store.set('otpCreatedAt', createdAt);

        return res
            .status(200)
            .json(new ApiResponse(200, { otp: OrignalOtp }, 'OTP sent successfully'));

    }
    catch (error) {
        return res.status(500).json(new ApiError(500, 'Internal Server Error in resendOtp', error.message));
    }
})

const verifyOtpWhileRegistration = asyncHandler(async (req, res, next) => {

    while (true) {
        const { userotp } = req.body

        // const client = createClient();
        // await client.connect();

        // const otp = await client.get('otp');
        // const otpCreatedAt = await client.get('otpCreatedAt');
        // const phoneNumber = await client.get('userNumber');

        const phoneNumber = store.get('userNumber');
        const otp = store.get('otp');
        const otpCreatedAt = store.get('otpCreatedAt');


        if (!otp || !otpCreatedAt) {
            throw new ApiError(400, 'OTP not found or expired');
        }

        if (!userotp) {
            throw new ApiError(400, 'OTP is required');
        }

        if (isOTPValid(userotp, otp, otpCreatedAt)) {
            await User.findOneAndUpdate(
                { phoneNumber },
                { verified: true },
                { new: true, runValidators: true })
            return res
                .status(200)
                .json(new ApiResponse(200, {}, 'OTP verified successfully'));
        }
        else {

            throw new ApiError(400, 'Invalid OTP, please try again');

        }

    }
})

const verifyOtpWhileLogin = asyncHandler(async (req, res, next) => {

    while (true) {
        const { userotp } = req.body

        // const client = createClient();
        // await client.connect();

        // const otp = await client.get('otp');
        // const otpCreatedAt = await client.get('otpCreatedAt');
        // const phoneNumber = await client.get('userNumber');

        const phoneNumber = store.get('userNumber');
        const otp = store.get('otp');
        const otpCreatedAt = store.get('otpCreatedAt');


        if (!otp || !otpCreatedAt) {
            throw new ApiError(400, 'OTP not found or expired');
        }

        if (!userotp) {
            throw new ApiError(400, 'OTP is required');
        }

        // isOTPValid(userotp, otp, otpCreatedAt);

        // const count = 0
        // count++

        // const isExpired = (Date.now() - otpCreatedAt) > (10 * 60 * 500)

        if (isOTPValid(userotp, otp, otpCreatedAt)) {
            return res
                .status(200)
                .json(new ApiResponse(200, {}, 'OTP verified successfully'));
        }
        else {
            if (isExpired) {
                return res
                    .status(400)
                    .json(new ApiError(400, 'OTP expired, please try again'));
            }
        }

    }
})

export {
    getNumber,
    registerUser,
    loginUser,
    sendOtp,
    ResendOtp,
    verifyOtpWhileRegistration,
    verifyOtpWhileLogin,
    generateAccessAndRefreshTokens,
    updateEmail,
    updateFullName,
    changeCurrentPassword,
    getCurrentUser,
    logoutUser,
    refreshAccessToken
}