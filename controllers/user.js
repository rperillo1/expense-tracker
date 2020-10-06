const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const SECRET = process.env.REACT_APP_GOOGLE_SECRET;
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);


async function verify(req, res) {
    let userObj = {}
    const token = req.body.tokenObj.id_token
    // console.log('hitting verify - token', token)
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    payload.googleId = payload.sub
    payload.profileObj = {}
    payload.profileObj.email = payload.email
    payload.profileObj.name = payload.name
    payload.profileObj.imageUrl = payload.picture
    console.log('payload', payload)
    let user = await loginUser(payload);
    let _token = createJWT(payload.sub);
    userObj.token = _token;
    userObj.user = user
    res.json(userObj);
}
verify().catch(console.error);


async function loginUser(payload) {
    try {
        const user = await User.findOne({ googleId: payload.googleId});
        if (!user) {
            const user = new User(payload);
            user.imageUrl = payload.profileObj.imageUrl;
            user.email = payload.profileObj.email;
            user.name = payload.profileObj.name;
            await user.save();
        }
        return user;
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
    verifyUser: verify,
}