const User = require('../models/user');



// async function login(req, res) {
//     console.log('req.body', req.body)
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         console.log('user', user)
//         res.json(user)
//     } catch (err) {
//         console.log(err)
//         return res.status(400).json(err);
//     }
// }

async function login(req, res) {
    const user = new User(req.body);
    console.log(user)
    try {
        await user.save();

        res.json({ user });
        // const token = createJWT(user);
        // res.json({ token });
    } catch (err) {
        // Probably a duplicate email
        res.status(400).json(err);
    }
}


module.exports = {
    login
}