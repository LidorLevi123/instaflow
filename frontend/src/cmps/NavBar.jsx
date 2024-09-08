import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'

export function NavBar() {
	const navigate = useNavigate()

	return (
		<nav className="nav-bar">
			<ul className="nav-list">
                <li>
                    <NavLink to="/" className="home-page">Home</NavLink>
                </li>
			</ul>
		</nav>
	)
}