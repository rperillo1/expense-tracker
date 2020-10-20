const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

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
    payload.profileObj.googleId = payload.sub
    console.log('payload', payload)
    let user = await loginUser(payload);
    let _token = createJWT(payload.profileObj);
    userObj.token = _token;
    userObj.user = user
    res.json(userObj);
}
// verify().catch(console.error);


async function loginUser(payload) {
    try {
        const user = await User.findOne({ googleId: payload.googleId});
        if (!user) {
            const user = new User(payload);
            // user.imageUrl = payload.profileObj.imageUrl;
            user.imageUrl = payload.imageUrl;
            // user.email = payload.profileObj.email;
            user.email = payload.email;
            // user.name = payload.profileObj.name;
            user.name = payload.name;
            await user.save();
        }
        return user;
    } catch (err) {
        console.log(err)
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
    loginUser
}




// module.exports = function(req, res, next) {
//   // Check for the token being sent in three different ways
//   let token = req.get('Authorization') || req.query.token || req.body.token;
//   if (token) {
//     // Remove the 'Bearer ' if it was included in the token header
//     token = token.replace('Bearer ', '');
//     // Check if token is valid and not expired
//     jwt.verify(token, SECRET, function(err, decoded) {
//       if (err) {
//         next(err);
//       } else {
//         // It's a valid token, so add user to req
//         req.user = decoded.user;    
//         next();
//       }
//     });
//   } else {
//     next();
//   }
// };