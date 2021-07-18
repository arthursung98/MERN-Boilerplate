import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/userAction'
import { withRouter } from 'react-router-dom'


function LoginPage(props) {
    // Dispatch from Redux
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onPWHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        // Prevents Refreshing when there is no action.
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        // use the dispatch here. loginUser will be an action, so we need to
        // create it in the action folder.
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('Error')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
                >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPWHandler} />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)