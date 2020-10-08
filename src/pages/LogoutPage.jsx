import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import tokenServices from '../utils/tokenServices';
import { UserContext } from "../contexts/UserContext";


const clientId = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`


function LogoutPage() {
    const { user, setUser } = useContext(UserContext);


    const onSuccess = () => {
        tokenServices.removeToken()
        setUser({});
        // setIsLoggedIn(false);
        console.log('Logout made successfully');
    };

    const onFailure = () => {
        console.log('Failed to logout')
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                onFailure={onFailure}
            ></GoogleLogout>
            {/* <h1>{user.name}</h1> */}
        </div>
    );

}

export default LogoutPage;

