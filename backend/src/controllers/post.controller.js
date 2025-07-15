import { User } from '../models/user.models.js';
import { Post } from '../models/posts.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiErrors.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

const createPost = asyncHandler(async (req, res) => {
    const { content, title, category } = req.body;
    const userId = "68769ec6d50f90f6808bc05a"
    // req.user._id;

    if (!content || !title || !category) {
        throw new ApiError(400, 'Content, title, and category are required');
    }

    const user = await User.findById(userId)
    // req.user.username || req.user.fullName || 'Anonymous';

    const postedBy = user.username || user.fullName || 'Anonymous';

    const postData = {
        user: userId,
        postedBy,
        content,
        title,
        category
    };

    if (req.file) {
        const imageUrl = await uploadOnCloudinary(req.file.path);
        postData.image = imageUrl;
    }

    const post = await Post.create(postData);

    return res.status(201).json(new ApiResponse(201, post, 'Post created successfully'));
})

export {
    createPost
}