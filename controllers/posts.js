import mongoose from 'mongoose';

import postMessage from '../models/posts.js';

export const getPosts = async (req, res) => {

	console.log("Inside get posts");
	try {
		const posts = await postMessage.find();

		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {

	const newPost = new postMessage({ ...req.body, creator: req.userId });
	console.log("REquest body: " , newPost);

	try {
		const post = await newPost.save();

		res.status(201).json(newPost);	// status 201 : created
	} catch (err) {
		res.status(409).json({ message: err.message });
	}

};

export const updatePost = async (req, res) => {
	const post = req.body;
	const  {id: _id} = req.params;

	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

	const updatedPost = await postMessage.findByIdAndUpdate(_id, {...post, _id}, {new : true});

	console.log("updatedPost: ", updatedPost)
	res.status(200).json(updatedPost);
}

export const deletePost = async (req, res) => {
	const { id } = req.params;

	if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

	await postMessage.findByIdAndRemove(id);

	res.status(200).json({ message: "Deleted Successfully" });
}

export const likePost = async (req, res) => {
	const { id } = req.params;

	if (!req.userId) {
		return res.status(401).json({ message: 'Unauthorized user' });
	}

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).json({ message: 'No Post with that id' });
	
	const post = await postMessage.findById(id);
	const index = post.likes.findIndex((id) => id === String(req.userId));

	if (index == -1) {
		// like the post
		post.likes.push(String(req.userId));
	} else {
		// unlike the post
		post.likes = post.likes.filter((id) => id != String(req.userId));
	}
	const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true });

	console.log(updatedPost);
	res.status(200).json(updatedPost);
}