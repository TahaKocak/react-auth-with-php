import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";


function Register() {
    const Navigate = useNavigate();
    const [Username, SetUsername] = useState('')
    const [Password, SetPassword] = useState('')
    const [Result, SetResult] = useState('')

    useEffect(() => {
        const UserToken = sessionStorage.getItem('token')

        if (UserToken){
            Navigate('/')
        }

    }, [])

    const submitRegister = () => {
        let formData = new FormData()
        formData.append('username', Username)
        formData.append('password', Password)

        fetch(`${process.env.REACT_APP_SERVER}register`,{
            method: 'post',
            body: formData
        }).then((x) => x.json()).then((res) => {
            SetResult({
                'type' :res.type,
                'text': res.text
            })

            if (res.type === 'success'){
                setTimeout( () => {
                    Navigate('/login')
                },1000)
            }
        })
    }

    return (
        <div>
            <h4>Register</h4>

            {Result && (
                <div> {Result.type}: {Result.text}</div>
            )}

            <input type="text" placeholder="Enter username" onChange={(e) => SetUsername(e.target.value)}/> <br/>
            <input type="password" placeholder="Enter password" onChange={(e) => SetPassword(e.target.value)}/> <br/>
            <button onClick={() => submitRegister()}>Register</button>

            <p>Have a account? <Link to="/register">Let's login</Link></p>
        </div>
    )
}

export default Register;