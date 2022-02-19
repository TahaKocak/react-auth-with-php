import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


function Navbar() {
    const User = useSelector(state => state.User.value)

    return (
        <nav>
            <span>
                React Router
            </span>

            {(User?.token) ? <>
                    <Link to="/">Homepage</Link>
                </>
                : <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            }
        </nav>
    )
}

export default Navbar