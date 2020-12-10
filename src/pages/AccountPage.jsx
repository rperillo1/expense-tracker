import React from 'react';
import AccountCard from '../components/AccountCard';
import AccountForm from '../components/AccountForm';



function AccountPage({ createAccount, deleteOneAccount, getOneAccount }) {

    return (
        <div>
            <AccountCard deleteOneAccount={deleteOneAccount} getOneAccount={getOneAccount}/>
            <AccountForm createAccount={createAccount} />
        </div>
    )
}



export default AccountPage;