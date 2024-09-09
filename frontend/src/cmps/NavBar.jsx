import { Link, NavLink } from 'react-router-dom'
import { SvgIcon } from './SvgIcon'

export function NavBar() {

	return (
		<nav className="nav-bar">
			<ul className="nav-list">
                <li>
                    <NavLink to="/"><SvgIcon iconName="logoTxt"/></NavLink>
                </li>
                <li>
                    <NavLink to="/"><SvgIcon iconName="home"/>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/"><SvgIcon iconName="search"/>Search</NavLink>
                </li>
                <li>
                    <NavLink to="/"><SvgIcon iconName="explore"/>Explore</NavLink>
                </li>
			</ul>
		</nav>
	)
}