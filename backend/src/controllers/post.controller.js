import { User } from '../models/user.models.js';
import { Post } from '../models/posts.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiErrors.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';


const createPost = asyncHandler(async (req, res) => {
    const { content, title, category } = req.body;

    const usrId = req.user._id;

    if (!content || !title || !category) {
        throw new ApiError(400, 'Content, title, and category are required');
    }

    // const user = await User.findById(userId)
    const userId = req.user.username || req.user.fullName || 'Anonymous';

    // const postedBy = user.username || user.fullName || 'Anonymous';

    const latestPost = await Post.findOne().sort({ createdAt: -1 });

    const latestPostId = latestPost.id || 0;

    const nid = Number(latestPostId) + 1;

    while (true) {
        const expos = await Post.find({ id: nid });

        if (expos.length > 0) {
            String(nid) + "ex"
        }
        else {
            break
        }
    }

    const postData = {
        user: usrId,
        postedBy: userId,
        content,
        title,
        category,
        id: Number(latestPostId) + 1
    };

    if (req.file) {
        const imageUrl = await uploadOnCloudinary(req.file.path);
        postData.image = imageUrl;
    }

    const post = await Post.create(postData);

    return res.status(201).json(new ApiResponse(201, post, 'Post created successfully'));
})

const getPostById = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    if (!postId) {
        throw new ApiError(400, 'Post ID is required');
    }

    const post = await Post.find(id = postId)

    if (!post) {
        throw new ApiError(404, 'Post not found');
    }

    return res.status(200).json(new ApiResponse(200, post, 'Post retrieved successfully'));

})

const deletePost = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    if (!postId) {
        throw new ApiError(400, 'Post ID is required');
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json(new ApiResponse(200, null, 'Post deleted successfully'));

})

const editPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { content, title, category } = req.body;

    if (!postId) {
        throw new ApiError(400, 'Post ID is required');
    }
    if (!content || !title || !category) {
        throw new ApiError(400, 'Content, title, and category are required');
    }

    const post = await Post.findByIdAndUpdate(postId, {
        content, title, category
    }, { new: true });

    if (!post) {
        throw new ApiError(404, 'Post not found');
    }

    return res.status(200).json(new ApiResponse(200, post, 'Post updated successfully'));

})

const editPostImage = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!postId) {
        throw new ApiError(400, 'Post ID is required');
    }

    const post = await Post.findByIdAndUpdate(postId, {
        image: req.file ? await uploadOnCloudinary(req.file.path) : undefined
    })

    if (!post) {
        throw new ApiError(404, 'Post not found');
    }

    return res.status(200).json(new ApiResponse(200, post, 'Post image updated successfully'));

})

const fetchPostsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;

    if (!category) {
        throw new ApiError(400, 'Category is required');
    }

    const posts = await Post.find({ category });
    const { sortBy } = req.query;

    if (sortBy === 'new') {
        posts.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortBy === 'likes') {
        posts.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
    }

    // console.log(posts);

    return res.status(200).json(new ApiResponse(200, posts, 'Posts retrieved successfully'));
})

export {
    createPost,
    getPostById,
    deletePost,
    editPost,
    editPostImage,
    fetchPostsByCategory
}