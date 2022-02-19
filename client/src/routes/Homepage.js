import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {set} from '../stores/user'

function Homepage() {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const User = useSelector(state => state.User.value)


    useEffect(() => {
        const UserToken = sessionStorage.getItem('token');

        if (!User?.token && !UserToken) {
            navigate('/login')
        }else {
            let formData = new FormData()
            formData.append('token',UserToken)
            fetch(`${process.env.REACT_APP_SERVER}token`,{
                method: 'post',
                body: formData
            }).then((x) => x.json()).then((res) => {
                if (res.data) {
                    dispatch(set(res.data))
                }else {
                    sessionStorage.removeItem('token')
                    navigate('/login')
                }
            })
        }

    }, [])

    return (
        <>{User.username}</>
    )

}

export default Homepage