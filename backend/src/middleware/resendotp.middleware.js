import { generateOTP, isOTPValid } from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';

export const resendOpt = asyncHandler(async (req, res, next) => {
    try {
        const num = req.number;
        if (!num) {
            throw new ApiError(400, 'Phone number is required');
        }
        const { otp, otpCreatedAt } = generateOTP();

        const userotp = req.body.userotp;

        if (!userotp) {
            throw new ApiError(400, 'OTP is required');
        }
    }
    catch (error) {
        return res.status(500).json(new ApiError(500, 'Internal Server Error in resendOtp', error.message));
    }
})