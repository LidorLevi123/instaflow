import { NavLink } from 'react-router-dom'
import { SvgIcon } from './SvgIcon'
import { appService } from '../services/app.service'

export function NavBar({ onOpenModal }) {
    const links = appService.getLinks()

    return (
        <nav className="nav-bar">
            <ul className="nav-list">

                {
                    links.map(link =>
                        <li key={link.name} className={link.class}>
                            <NavLink to={link.path || ''} onClick={link.name === 'addFeed' ? onOpenModal : null}>
                                <SvgIcon iconName={link.name} className={link.class || ''} />{link.txt}
                            </NavLink>
                        </li>)
                }
            </ul>
        </nav>
    )
}