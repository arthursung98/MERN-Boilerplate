import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userAuth } from '../_actions/userAction'

export default function (SpecificComponent, option, adminRoute = null) {
    // option
    // 1. null => anyone can access the website address
    // 2. true => only logged in users can access the website
    // 3. false => logged in users cannot access the website
    // adminRoute
    // 1. true => only for admin access.
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        // First, connect to the backend. The auth method really does this
        // for us, because the auth method takes the user token, and sends back
        // the user information. No business logic to be done here.
        useEffect(() => {
            dispatch(userAuth()).then(response => {
                console.log(response);

                // Not logged in
                if(!response.payload.isAuth) {
                    if(option) {
                        alert('Please login first.')
                        props.history.push('/login');
                    }
                } else {    // logged in
                    if(adminRoute && !response.payload.isAdmin) {
                        alert('You have no admin authority.')
                        props.history.push('/')
                    } else {
                        if(option === false) {
                            alert('You are already logged in.')
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck;
}