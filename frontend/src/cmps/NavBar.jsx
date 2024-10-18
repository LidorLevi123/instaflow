import { NavLink } from 'react-router-dom'
import { SvgIcon } from './SvgIcon'
import { useSelector } from 'react-redux'

export function NavBar({ onOpenModal }) {

    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    return (
        <nav className="nav-bar">
            <ul className="nav-list">
                <li className="logo">
                    <NavLink to="/">
                        <SvgIcon iconName="logoTxt" />
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/">
                        <SvgIcon iconName="home" />Home
                    </NavLink>
                </li>

                <li>
                    <SvgIcon iconName="search" />Search
                </li>

                <li>
                    <NavLink to="explore">
                        <SvgIcon iconName="explore" />Explore
                    </NavLink>
                </li>

                <li>
                    <NavLink to="reels">
                        <SvgIcon iconName="reels" />Reels
                    </NavLink>
                </li>

                <li>
                    <NavLink to="messages">
                        <SvgIcon iconName="messenger" />Messages
                    </NavLink>
                </li>

                <li>
                    <SvgIcon iconName="heart" />Notifications
                </li>

                <li onClick={onOpenModal}>
                    <SvgIcon iconName="addFeed" />Create
                </li>

                <li className="btn-profile">
                    <img className="user-img" src={loggedinUser.imgUrl} alt="" />Profile
                </li>

                <li>
                    <NavLink to="https://www.threads.net/?xmt=AQGzXUqqEb9xb-HuqkLyKZMoTtPiJ5GimIdR-VpPWsD2kxA">
                        <SvgIcon iconName="threads" />Threads
                    </NavLink>
                </li>

                <li>
                    <SvgIcon iconName="more" />More
                </li>
            </ul>
        </nav>
    )
}