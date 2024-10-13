import { useState } from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'

import { login } from '../store/actions/user.actions'

export function LoginPage() {
    const [userCreds, setUserCreds] = useState({ username: '', password: '' })
    const navigate = useNavigate()

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()

        if (!userCreds.username) return
        await login(userCreds)
        navigate('/')
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value

        setUserCreds(prevCreds => ({
            ...prevCreds,
            [field]: value
        }))
    }

    return (
        <section className="login-page">
            <div>
                <div className="logo">Instagram</div>

                <form onSubmit={onLogin}>
                    <input
                        type="text"
                        placeholder="Phone number, username, or email"
                        name="username"
                        onChange={handleChange}
                        value={userCreds.username} />
                    <input
                        type="text"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={userCreds.password} />
                    <button className="btn-login">Log in</button>
                </form>

                <div>
                    <hr /> OR <hr />
                </div>

                <p>Log in with Facebook</p>
                <small>Continue as a Guest</small>
            </div>

            <div>
                <p>Don't have an account? <NavLink to="/signup">Sign up</NavLink></p>
            </div>
        </section>
    )
}