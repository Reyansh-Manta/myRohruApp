import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createPost } from "../controllers/post.controller.js";

const router = Router()

router.route("/createPost").post(createPost)

export default router;