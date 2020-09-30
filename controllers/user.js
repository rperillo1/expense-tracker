const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const SECRET = process.env.REACT_APP_GOOGLE_SECRET;
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);


async function verify(req, res) {
    const token = req.body.tokenObj.id_token
    // console.log('hitting verify - token', token)
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        // Specify the CLIENT_ID of the app that accesses the backend
    });
    console.log('ticket', ticket.payload)
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // res.json(payload);
    let _token = await login(payload);
    console.log('token from login', _token)
    res.json(_token);
}
verify().catch(console.error);


async function login(payload) {
    console.log('payload', payload)
    try {
        const user = await User.findOne({ googleId: payload.sub });
        if (!user) {
            const user = new User();
            user.imageUrl = payload.picture;
            user.googleId = payload.sub;
            user.email = payload.email;
            user.name = payload.name;
            await user.save();
        }
        const token = createJWT(payload.sub);
        return token;
    } catch (err) {
        return(err);
    }
}

// async function login(req, res) {
//     // console.log('req', req.body)
//     try {
//         const user = await User.findOne({ googleId: req.body.sub });
//         if (!user) {
//             const user = new User(req.body);
//             user.imageUrl = req.body.picture
//             user.googleId = req.body.sub
//             await user.save();
//         }
//         const token = createJWT(req.body.sub);
//         res.json({ token });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// }

async function getUser(req, res) {
    console.log('req from getUser', req.body)
    // user.findOne with req.body, which should have the token attached to it.
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
    verifyUser: verify,
    getUser
}