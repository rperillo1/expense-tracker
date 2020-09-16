const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const SECRET = process.env.GOOGLE_SECRET;
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);


async function verify(req, res) {
    const token = req.body.tokenObj.id_token
    console.log('hitting verify - token', token)
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        // Specify the CLIENT_ID of the app that accesses the backend
    });
    console.log('ticket', ticket)
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    res.json(payload);
}
verify().catch(console.error);


async function login(req, res) {
    console.log('hit login')
    console.log('req', req.body)
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const user = new User(req.body);
            user.imageUrl = req.body.picture
            user.googleId = req.body.sub
            await user.save();
        }
        // res.json({ user });
        const token = createJWT(user);
        res.json({ token });
    } catch (err) {
        res.status(400).json(err);
    }
}


// Helper Function
function createJWT(user) {
    return jwt.sign(
        { user },  // data payload
        SECRET,
        { expiresIn: '24h' }
    );
}


module.exports = {
    login,
    verifyUser: verify
}