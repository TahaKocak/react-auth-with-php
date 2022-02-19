import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {set} from '../stores/user'
import {useDispatch} from "react-redux";

function Login() {
    const Navigate = useNavigate();
    const Dispatch = useDispatch();
    const [Username, SetUsername] = useState('')
    const [Password, SetPassword] = useState('')
    const [Result, SetResult] = useState('')

    useEffect(() => {
        const UserToken = sessionStorage.getItem('token')

        if (UserToken){
            Navigate('/')
        }

    }, [])

    const submitLogin = () => {
        let formData = new FormData()
        formData.append('username', Username)
        formData.append('password', Password)

        fetch(`${process.env.REACT_APP_SERVER}login`,{
            method: 'post',
            body: formData
        }).then((x) => x.json()).then((res) => {
            SetResult({
                'type' :res.type,
                'text': res.text
            })

            if (res.type === 'success'){
                sessionStorage.setItem('token',res.data.token)
                Dispatch(set(res.data))
                setTimeout( () => {
                    Navigate('/')
                },1000)
            }
        })
    }

    return (
        <div>
            <h4>Login</h4>

            {Result && (
                <div> {Result.type}: {Result.text}</div>
            )}

            <input type="text" placeholder="Enter username" onChange={(e) => SetUsername(e.target.value)}/> <br/>
            <input type="password" placeholder="Enter password" onChange={(e) => SetPassword(e.target.value)}/> <br/>
            <button onClick={() => submitLogin()}>Log in</button>

            <p>Haven't a account? <Link to="/register">Let's create</Link></p>
        </div>
    )
}

export default Login;