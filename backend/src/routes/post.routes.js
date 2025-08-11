import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createPost, fetchPostsByCategory } from "../controllers/post.controller.js";

const router = Router()

router.route("/createPost").post(verifyJWT, createPost)
router.route("/category/:category").get(fetchPostsByCategory)


export default router;