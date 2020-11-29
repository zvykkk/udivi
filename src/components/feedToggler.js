import React, {useContext, Fragment} from 'react'
import {NavLink} from 'react-router-dom'

import {CurrentUserContext} from "../contexts/thisUser";

const FeedToggler = ({tagName}) => {
    const [currentUserState] = useContext(CurrentUserContext)
    return (
        <div className='feed-toggle'>
            <ul className='nav nav-pills outline-active'>
                {currentUserState.isLoggedIn && (
                    <Fragment>
                        <li className='nav-item'>
                            <NavLink to='/feed' className='nav-link'>
                                Your feed
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/' className='nav-link' exact>
                                Global feed
                            </NavLink>
                        </li>
                    </Fragment>
                )}

                {tagName && (
                    <li className='nav-item'>
                        <NavLink to={`/tags/${tagName}`} className='nav-link' exact>
                            {tagName}
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default FeedToggler
