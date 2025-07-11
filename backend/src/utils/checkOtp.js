import { asyncHandler } from "./asyncHandler";
import { sendOtp } from "../middleware/sendotp.middleware.js";

export const verifyOtp = asyncHandler(async (req, res) => {

    const { userotp } = req.body
    if (!userotp) {
        throw new ApiError(400, 'OTP is required');
    }

    isOTPValid(userotp, otp, otpCreatedAt);

    while (true) {
        if (!isOTPValid) {
            throw new ApiError(400, 'Invalid or expired OTP');
        }
        else {
            next()
        }
    }
})