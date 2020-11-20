import { useState } from "react";

export default initialValue => {
    const [values, setValues] = useState(initialValue);
    const handleChange = e => {
        console.log(e.target.name)
        console.log(e.target.value)
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    };
    const reset = () => {
        setValues({ name: '', balance: 0, income: 0});
    }
    return [values, handleChange, reset];
};

