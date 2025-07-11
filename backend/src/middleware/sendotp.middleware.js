import {generateOTP, isOTPValid} from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';
import {createClient} from 'redis';

export const sendOtp = asyncHandler(async (req, res, next) => {

    try {

        const client = createClient();
        await client.connect();

        const number = await client.get('userNumber');

        if (!number) {
            throw new ApiError(400, 'phone number not recieved in sendOtp middleware');
        }

        return {otp, otpCreatedAt} = await generateOTP();
        
    } catch (error) {
        return new ApiError(500, 'Internal Server Error', error.message);
    }
    
})


