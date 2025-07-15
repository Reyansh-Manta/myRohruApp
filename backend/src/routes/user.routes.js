import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { registerUser, getNumber } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(upload.single("profilePicture") , registerUser)
router.route("/getNumber").post(getNumber)

export default router;