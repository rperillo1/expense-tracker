const BASE_URL = '/api/users/'

function PostData(userData) {
    return fetch(BASE_URL + 'login', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(userData)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Unsuccessful Login!');
    })
    //MISSING TOKEN - SET TOKEN (DONT NEED?)
}


// function getUser() {
//     return 
// }


// import tokenService from './tokenService';

// const BASE_URL = '/api/users/';

// function login(creds) {
//   return fetch(BASE_URL + 'login', {
//     method: 'POST',
//     headers: new Headers({'Content-Type': 'application/json'}),
//     body: JSON.stringify(creds)
//   })
//   .then(res => {
//     if (res.ok) return res.json();
//     throw new Error('Bad Credentials!');
//   })
//   .then(({ token }) => tokenService.setToken(token));
// }

export default {
    PostData,
}
