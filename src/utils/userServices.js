const BASE_URL = '/api/users/'

function PostData(userData) {
    console.log('userData', userData)
    return fetch(BASE_URL + 'login', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(userData)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Unsuccessful Login!', res);
    })
    //MISSING - SET TOKEN (DONT NEED?)
}


export default {
    PostData,
}
