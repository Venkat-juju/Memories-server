import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {

    try {
        // to see what the header of the request has...
        console.log(req.headers);

        const token = req.headers.authorization.split(" ")[1];
        const isCustomerAuth = token.length < 500;
        let decodedData;

        if (isCustomerAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (err) {
        console.log("User authorization failed");
        console.log(err);
        res.status(401).json({ message: 'You are not a authorized user' });
    }
}

export default auth;