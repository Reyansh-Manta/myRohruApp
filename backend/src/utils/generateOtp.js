import bcrypt from "bcrypt";

export const generateOTP = async function() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString().slice(0, 6);
    // otp = otp.slice(0, 6); // Ensure OTP is exactly 6 digits
    const hashedotp = await bcrypt.hash(otp, 10); // Hash the OTP for security
    const createdAt = Date.now();
    return {hashedotp, createdAt, OrignalOtp: otp};
}
