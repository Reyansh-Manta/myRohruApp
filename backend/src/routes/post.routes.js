import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createPost, fetchPostsByCategory, getPostById } from "../controllers/post.controller.js";

const router = Router()

router.route("/createPost").post(verifyJWT, upload.fields([{ name: "image", maxCount: 5 }, { name: "cimage", maxCount: 1 }]), createPost)
router.route("/category/:category").get(fetchPostsByCategory)
router.route("/post/:postId").get(getPostById)


export default router;