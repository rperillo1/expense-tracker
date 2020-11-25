const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);


async function verifyUser(req, res) {
    const token = req.id_token

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    payload.googleId = payload.sub
    let user = await loginUser(payload);
    console.log('user_id', typeof user._id)
    let data = { name: user.name, email: user.email, googleId: user.googleId, imageUrl: user.imageUrl, _id: user._id, accounts: user.accounts }
    return data;
}
// verify().catch(console.error);


async function loginUser(payload) {
    try {
        const user = await User.findOne({ googleId: payload.googleId });
        if (!user) {
            const user = new User(payload);
            user.imageUrl = payload.picture;
            await user.save();
            return user;
        }
        return user;
    } catch (err) {
        console.log(err)
    }
}



module.exports = {
    verifyUser,
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