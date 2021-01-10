import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true,
	},
	creator: {
		type: String,
		required: true
	},
	tags: [{
		type: String
	}],
	selectedFiles: {
		type: String
	},
	likeCount: {
		type: Number,
		default: 0
	},
},{
	timestamps: true
});

export default mongoose.model('postMessage', postSchema);