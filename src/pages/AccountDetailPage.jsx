import React from 'react';
import { useEffect, useContext } from 'react';
import { CurrentAccountContext } from '../contexts/CurrentAccountContext';

function AccountDetailPage({ }) {
    const { currentAccount, setCurrentAccount } = useContext(CurrentAccountContext);

    // useEffect(()=> {

    // }, [])

    return (
        <div>
            <h5>Account Name:</h5>
            <h3>{currentAccount.name}</h3>
            <h5>Account Balance:</h5>
            <h3>{currentAccount.balance}</h3>
            <h5>Account ID:</h5>
            <h3>{currentAccount._id}</h3>
        </div>

    )
}


export default AccountDetailPage