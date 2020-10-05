import React from 'react';
import { GoogleLogout } from 'react-google-login';
import tokenServices from '../utils/tokenServices'


const clientId = '742998896262-126r6u5gq1d0jvm1sun5r4up65sicqo8.apps.googleusercontent.com'

// const clientId = `'${process.env.REACT_APP_GOOGLE_CLIENT_ID}'`


function LogoutPage() {
    const onSuccess = () => {
        tokenServices.removeToken()
        console.log('Logout made successfully');
    };

    const onFailure = () => {
        console.log('yao failed to logout')
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                onFailure={onFailure}
            ></GoogleLogout>
        </div>
    );

}

export default LogoutPage;

