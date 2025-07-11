import { generateOTP, isOTPValid } from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';
import { createClient } from 'redis';

export const resendOpt = asyncHandler(async (req, res, next) => {
    try {

        const client = createClient();
        await client.connect(); 

        const num = await client.get('userNumber');

        if (!num) {
            throw new ApiError(400, 'Phone number is required');
        }
        const { otp, otpCreatedAt } = generateOTP();

    }
    catch (error) {
        return res.status(500).json(new ApiError(500, 'Internal Server Error in resendOtp', error.message));
    }
})