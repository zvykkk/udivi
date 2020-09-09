import React from 'react'

const BackendErrorMessages = ({backendErrors}) => {
    const errorMessages = Object.entries(backendErrors).map(([key, value]) => {
       return `${key} ${value}`
    })
    return (
        <ul className='error-messages'>
            {errorMessages.map(errorMessage => (
                <li key={errorMessage}>{errorMessage}</li>
            ))}
        </ul>
    )
}

export default BackendErrorMessages
