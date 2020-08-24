import React, {useState} from 'react'
import {Link} from "react-router-dom";

import useFetch from "../../hooks/useFetch";

const Authentication = props => {
    const isLogin = props.match.path === '/login'
    const pageTitle = isLogin ? 'Sign In' : 'Sign Up'
    const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
    const descriptionLink = isLogin ? '/register' : '/login'
    const apiUrl = isLogin ? '/users/login' : '/users'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [{isLoading, response, error}, doFetch] = useFetch(apiUrl)


    const handleSubmit = event => {
        event.preventDefault()
        const user = isLogin ? {email, password} : {email, password, username}
        doFetch({
                method: 'post',
                data: {
                    user
                }
            })
    }

    return (
        <div className='auto-page'>
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1 className='text-center'>{pageTitle}</h1>
                        <p className='text-center'>
                            <Link to={descriptionLink}>{descriptionText}</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                {!isLogin && (
                                    <fieldset className='form-group'>
                                        <input
                                            type='text'
                                            className='form-control form-control-lg'
                                            placeholder='Username'
                                            value={username}
                                            onChange={e => setUsername (e.target.value)}
                                        />
                                    </fieldset>
                                )}
                                <fieldset className='form-group'>
                                    <input
                                        type='email'
                                        className='form-control form-control-lg'
                                        placeholder='Email'
                                        value={email}
                                        onChange={e => setEmail (e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        type='password'
                                        className='form-control form-control-lg'
                                        placeholder='Password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </fieldset>
                                <button
                                    className='btn btn-lg btn-primary  float-right'
                                    type='submit'
                                    disabled={isLoading}
                                >
                                    {pageTitle}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Authentication
