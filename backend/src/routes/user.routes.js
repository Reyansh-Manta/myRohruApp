import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(upload.single("profilePicture") , registerUser)

export default router;