import React from 'react'
import {Link, NavLink} from "react-router-dom";

const TopBar = () => {
    return (
        <nav>
            <div className='container'>
                <Link to='/'>
                    Udivi
                </Link>
                <ul>
                    <li>
                        <NavLink to='/' exact>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/login'>
                            Sign in
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/register'>
                            Sign up
                        </NavLink>
                    </li>
                </ul>

            </div>
        </nav>

    )
}

export default TopBar
