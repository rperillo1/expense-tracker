const User = require('../models/user');
const jwt = require('jsonwebtoken');

const SECRET = process.env.GOOGLE_SECRET;


async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const user = new User(req.body);
            await user.save();
        }
        // res.json({ user });
        const token = createJWT(user);
        res.json({ token });
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
}

function createJWT(user) {
    return jwt.sign(
        { user },  // data payload
        SECRET,
        { expiresIn: '24h' }
    );
}


module.exports = {
    login
}