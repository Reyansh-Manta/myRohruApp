import bcrypt from 'bcrypt';

export const isOTPValid = async function(userotp, otp, createdAt) {
    const isValid = await bcrypt.compare(userotp, otp)
    const isExpired = (Date.now() - createdAt) > (10 * 60 * 500); // 5 minutes expiry
    if(isValid && !isExpired) {
        return true;
    }   
}