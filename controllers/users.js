import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/users.js';

export const signin = async (req, res) => {

    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser)
            return res.status(404).json({ 'message': "User doesn't exist" });
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({ 'message': 'Invalid credentials' });
        } else {
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', {expiresIn: '1h'});
            res.status(200).json({ result: existingUser, token });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const signup = async (req, res) => {

    try {
        const { email, firstName, lastName, password, confirmPassword } = req.body;

        const existingUser = await User.findOne({ email });

        console.log(existingUser);

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        } else if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password not matching with the confirm password' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        console.log(hashedPassword);
        const result = await User.create({ name: `${firstName} ${lastName}`, email, password : hashedPassword });

        console.log(result);

        console.log("User created", result);
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', {expiresIn: '1h'});

        res.status(200).json({ result, token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'Something went wrong' });
    }
};