const User = require('../models/user');


// function index(req, res, next) {

//     // inside here should be an API call to the user backend to fetch the user/users

//     console.log(req.query)
//     let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
//     let sortKey = req.query.sort || 'name';
//     User.find(modelQuery)
//     .sort(sortKey).exec(function(err, users) {
//       if (err) return next(err);
//     //   Passing search values, name & sortKey, for use in the EJS
//       res.render('profile/index', {
//         users,
//         user: req.user,
//         name: req.query.name,
//         sortKey
//       });
//     });
// }

// async function login(req, res) {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) return res.status(400).json({ err: 'bad credentials' });
//         user.comparePassword(req.body.pw, (err, isMatch) => {
//             if (isMatch) {
//                 const token = createJWT(user);
//                 res.json({ token });
//             } else {
//                 return res.status(400).json({ err: 'bad credentials' });
//             }
//         });
//     } catch (err) {
//         return res.status(400).json(err);
//     }
// }


module.exports = {
    index
}