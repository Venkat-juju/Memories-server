import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRouter from './routes/posts.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser:true, useUnifiedTopology: true })
	.then(() => {
		app.listen(PORT, () => {
			console.log("APP listening on port " + PORT);
		});
	})
	.catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRouter);

app.use('/', (req, res) => {
	res.send('Hello!');
});