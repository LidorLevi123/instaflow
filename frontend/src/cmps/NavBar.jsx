import { NavLink } from 'react-router-dom'
import { SvgIcon } from './SvgIcon'
import { appService } from '../services/app.service'
import { useEffect } from 'react'

export function NavBar({ onOpenModal }) {
    const links = appService.getLinks()

    useEffect(()=> {
        document.querySelector('.btn-create-feed a').classList.remove('active')
    })

    return (
        <nav className="nav-bar">
            <ul className="nav-list">

                {
                    links.map(link =>
                        <li key={link.name} className={link.class}>
                            <NavLink to={link.path || ''} onClick={link.name === 'addFeed' ? onOpenModal : null}>
                                <SvgIcon iconName={link.name} />{link.txt}
                            </NavLink>
                        </li>)
                }
            </ul>
        </nav>
    )
}