import React from 'react';
import UseFormState from "../hooks/UseFormState"


function AddAccountPage({ createAccount }) {
    const [acctValues, handleChange, reset] = UseFormState({ name: '', balance: 0, income: 0})


    const handleSubmit = (e) => {
        console.log('yo')
        console.log(acctValues);
        createAccount(acctValues);
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                reset();
            }}>
                <label>Account Name:</label>
                <input type='text' value={acctValues.name} onChange={handleChange} name='name'></input>
                <label>Starting Balance:</label>
                <input type='number' value={acctValues.balance} onChange={handleChange} name='balance' placeholder='4200'></input>
                <label>Income:</label>
                <input type='number' value={acctValues.income} onChange={handleChange} name='income' placeholder='3000'></input>
                <button type='submit'>Create Account</button>
            </form>
        </div>
    )
}



export default AddAccountPage;