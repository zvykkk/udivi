import React, {useState} from 'react'
import {Link} from "react-router-dom";


import useFetch from "../../hooks/useFetch";

const Authentication = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [{isLoading, response, error}, doFetch] = useFetch('/users/login')


    const handleSubmit = event => {
        event.preventDefault()
        doFetch({
                method: 'post',
                data: {
                    user: {
                        email: 'xcxc@hg.com',
                        password: '123'
                    }
                }
            })
    }





    return (
        <div className='auto-page'>
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1 className='text-center'>Login</h1>
                        <p className='text-center'>
                            <Link to='register'>Need an account?</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
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
                                    Sign in
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
