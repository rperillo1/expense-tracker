import tokenServices from "./tokenServices";

const BASE_URL = '/api/users/'


function AuthenticateGoogleUser(userData) {
    return fetch(BASE_URL + 'authenticate', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(userData)
    })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Bad Credentials!');
        })
}

// function SignupOrLogin(userData) {
//     return fetch(BASE_URL + 'login', {
//         method: 'POST',
//         headers: new Headers({ 'Content-Type': 'application/json' }),
//         body: JSON.stringify(userData)
//     })
//         .then(res => {
//             if (res.ok) return res.json();
//             throw new Error('Unsuccessful Login!', res);
//         })
// }

async function getUser() {
    let user = await tokenServices.getUserFromToken()
    console.log('user dawg', user)
    if (user) {    
        return user;
    } else {
        return {};
    }
}


export default {
    AuthenticateGoogleUser,
    getUser
}
