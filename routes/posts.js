import express from 'express';
import { getPosts, createPost, updatePost, deletePost } from '../controllers/posts.js';
const postRouter = express.Router();

postRouter.route('/')
.get(getPosts)
.post(createPost)

postRouter.route('/:id')
.patch(updatePost)
.delete(deletePost);

export default postRouter;