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
	name: {
		type: String,
		required: true
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
	likes: {
		type: [String],
		default: []
	},
},{
	timestamps: true
});

export default mongoose.model('postMessage', postSchema);