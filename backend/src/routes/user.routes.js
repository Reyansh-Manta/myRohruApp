import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { registerUser, getNumber, sendOtp, ResendOtp, verifyOtpWhileRegistration, verifyOtpWhileLogin } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(upload.single("profilePicture") , registerUser)
router.route("/getNumber").post(getNumber)
router.route("/sendOtp").get(sendOtp)
router.route("/ResendOtp").get(ResendOtp)
router.route("/verifyOtpWhileRegistration").post(verifyOtpWhileRegistration)
router.route("/verifyOtpWhileLogin").post(verifyOtpWhileLogin)

export default router;