import React, {useEffect} from 'react'
import {NavLink} from 'react-router-dom'

import useFetch from "../../hooks/useFetch"
import UserArticles from 'pages/userProfile/components/userArticles'

const UserProfile = ({location, match}) => {
    const slug = match.params.slug
    const isFavorites = location.pathname.includes('favorites')
    const apiUrl = `/profile/${slug}`
    const [{response}, doFetch] = useFetch(apiUrl)

    useEffect(() => {
        doFetch()
    }, [doFetch])

    console.log('response', response)

    if (!response) {
        return null
    }

    return (
        <div className='profile-page'>
            <div className='user-info'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12 col-md-10 offset-md-1'>
                            <img className='user-img' alt='' src={response.profile.image}/>
                            <h4>{response.profile.username}</h4>
                            <p>{response.profile.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-xs-12 col-md-10 offset-md-1'>
                        <div className='articles-toggle'>
                            <ul className='nav nav-pills outline-active'>
                                <li className='nav-item'>
                                    <NavLink
                                        to={`/profile/${response.profile.username}`}
                                        className='nav-link'
                                        exact
                                    >
                                        My Posts
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink
                                        to={`/profile/${response.profile.username}/favorites`}
                                        className='nav-link'
                                    >
                                        Favorites Posts
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <UserArticles
                            username={response.profile.username}
                            location={location}
                            isFavorites={isFavorites}
                            url={match.url}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
