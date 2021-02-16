import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const postRouter = express.Router();

postRouter.route('/')
.get(getPosts)
.post(auth, createPost)

postRouter.route('/:id')
.patch(auth, updatePost)
.delete(auth, deletePost);


postRouter.patch('/:id/likePost', auth, likePost);

export default postRouter;