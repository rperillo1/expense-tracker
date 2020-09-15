import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
'742998896262-rce3fctlgmuekqe0ekud1d8aglnsoreg.apps.googleusercontent.com';

function LogoutPage() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
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

