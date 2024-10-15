import { useState } from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'

import { signup } from '../store/actions/user.actions'

export function SignupPage() {
    const [userCreds, setUserCreds] = useState({ email: '', username: '', password: '', fullname: '' })
    const navigate = useNavigate()

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!userCreds.username || !userCreds.password || !userCreds.fullname) return

        try {
            await signup(userCreds)
            navigate('/')
        } catch (err) {
            
        }
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
        <section className="signup-page">
            <div>
                <div className="logo">
                    <img src="https://static.cdninstagram.com/rsrc.php/v3/yv/r/KoLLpWDb4f6.png" />
                </div>
                <p>
                    Sign up to see photos and videos
                    <br />
                    from your friends.
                </p>
                <button className="btn-facebook-login">
                    <img src="public/img/facebook-white.png" alt="facebook-icon" />
                    Log in with Facebook
                </button>

                <div className="or">
                    <div></div> OR <div></div>
                </div>

                <form onSubmit={onSignup}>
                    <input
                        type="text"
                        placeholder="Mobile Number or Email"
                        name="email"
                        onChange={handleChange}
                        value={userCreds.email} />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={userCreds.password} />
                    <input
                        type="text"
                        placeholder="Fullname"
                        name="fullname"
                        onChange={handleChange}
                        value={userCreds.fullname} />
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                        value={userCreds.username} />
                    <button className="btn-signup">Sign up</button>
                </form>
            </div>

            <div className="btn-have-account">
                <p>Have an account? <NavLink to="/login">Log in</NavLink></p>
            </div>
        </section>
    )
}