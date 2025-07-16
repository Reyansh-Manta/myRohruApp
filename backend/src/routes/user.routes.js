import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { registerUser, getNumber, sendOtp, ResendOtp, verifyOtpWhileRegistration, verifyOtpWhileLogin, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateFullName, updateEmail } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(upload.single("profilePicture") , registerUser)
router.route("/getNumber").post(getNumber)
router.route("/sendOtp").get(sendOtp)
router.route("/ResendOtp").get(ResendOtp)
router.route("/verifyOtpWhileRegistration").post(verifyOtpWhileRegistration)
router.route("/verifyOtpWhileLogin").post(verifyOtpWhileLogin)
router.route("/loginUser").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-fullName").patch(verifyJWT, updateFullName)
router.route("/update-email").patch(verifyJWT, updateEmail)

export default router;