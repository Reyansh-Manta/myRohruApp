import {generateOTP, isOTPValid} from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';

export const verifyOtp = asyncHandler(async (req, res, next) => {

    try {
        const {otp, otpCreatedAt} = generateOTP();
    
        const {userotp, number} = req.body

        if (!userotp || !number) {
            throw new ApiError(400, 'OTP and phone number are required');
        }
    
        req.number = number;
    
        isOTPValid(userotp, otp, otpCreatedAt);
    
        while(true){
            if(!isOTPValid){
                throw new ApiError(400, 'Invalid or expired OTP');
            }
            else{
                next()
            }
        }
    } catch (error) {
        return new ApiError(500, 'Internal Server Error', error.message);
    }

    
})