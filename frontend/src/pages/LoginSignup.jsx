import { NavLink } from 'react-router-dom'

export function LoginSignup() {
    return (
        <div className="login-page">
            <nav>
                <NavLink to=".">Login</NavLink>
                <NavLink to="signup">Signup</NavLink>
            </nav>
        </div>
    )
}