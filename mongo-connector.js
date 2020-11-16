require('dotenv').config();
const { MongoClient } = require('mongodb');
const MONGO_URL = process.env.DATABASE_URL


module.exports = async () => {
    let db = await MongoClient.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    db = db.db('expense-tracker');
    return { Users: db.collection('users'), Accounts: db.collection('accounts') };
}

// module.exports = async () => {
//     let db = await MongoClient.connect(MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
//     db = db.db('expense-tracker');
//     return { Users: db.collection('users'), Accounts: db.collection('accounts') };
// }

