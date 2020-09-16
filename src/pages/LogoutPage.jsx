import React, { useEffect } from 'react';
import { GoogleLogout } from 'react-google-login';
import tokenServices from '../utils/tokenServices'

const clientId = '742998896262-rce3fctlgmuekqe0ekud1d8aglnsoreg.apps.googleusercontent.com'
// const clientId = `'${process.env.REACT_APP_GOOGLE_CLIENT_ID}'`

function LogoutPage() {
    const onSuccess = () => {
        tokenServices.removeToken()
        console.log('Logout made successfully');
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );

}

export default LogoutPage;

