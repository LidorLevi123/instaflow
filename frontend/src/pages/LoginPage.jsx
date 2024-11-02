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
        const user = await login(userCreds)

        if(user) navigate('/')
        else console.log('Could not login')
        
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
                <div className="logo">
                    <img src="https://static.cdninstagram.com/rsrc.php/v3/yv/r/KoLLpWDb4f6.png"  />
                </div>

                <form onSubmit={onLogin}>
                    <input
                        type="text"
                        placeholder="Phone number, username, or email"
                        name="username"
                        onChange={handleChange}
                        value={userCreds.username} />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={userCreds.password} />
                    <button className="btn-login">Log in</button>
                </form>

                <div className="or">
                    <div></div> OR <div></div>
                </div>

                <div className="facebook-login">
                    <img src="/img/facebook.png" alt="facebook-icon" />
                    <p>Log in with Facebook</p>
                </div>
                <small className="btn-guest">Continue as a Guest</small>
            </div>

            <div className="btn-no-account">
                <p>Don't have an account? <NavLink to="/signup">Sign up</NavLink></p>
            </div>
        </section>
    )
}