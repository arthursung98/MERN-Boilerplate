import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser} from '../../../_actions/userAction'
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPWHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPWHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()

        if(Password !== ConfirmPassword) {
            return alert('Confirm Password must be the same.')
        }

        let body = {
            email : Email,
            name : Name,
            password : Password
        }

        // use the dispatch here. loginUser will be an action, so we need to
        // create it in the action folder.
        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.registerSuccess) {
                    props.history.push('/login')
                } else {
                    alert('Error at Register')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPWHandler} />
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPWHandler} />
                <br />
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)