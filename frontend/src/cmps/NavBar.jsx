import { NavLink } from 'react-router-dom'
import { SvgIcon } from './SvgIcon'
import { useEffect, useRef } from 'react'

export function NavBar({ onOpenCreateModal, user, onLogout }) {

    const elToolTipRef = useRef()

    useEffect(() => {
        const elFeedIndex = document.querySelector('.feed-index')
        elFeedIndex.addEventListener('click', onCloseToolTip)
        return () => elFeedIndex.removeEventListener('click', onCloseToolTip)
    }, [])

    function onOpenToolTip(ev) {
        ev.stopPropagation()
        elToolTipRef.current.classList.toggle('active')
    }

    function onCloseToolTip() {
        if (!elToolTipRef.current.classList.contains('active')) return
        elToolTipRef.current.classList.remove('active')
    }

    return (
        <nav className="nav-bar">
            <ul className="nav-list">
                <li className="logo">
                    <NavLink to="/">
                        <SvgIcon iconName="logoTxt" className="logo-txt"/>
                        <SvgIcon iconName="logo" className="logo-icon"/>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/">
                        <SvgIcon iconName="home" className="normal" />
                        <SvgIcon iconName="home-bold" className="bold" />
                        <span className="link-txt">Home</span>
                    </NavLink>
                </li>

                <li>
                    <SvgIcon iconName="search" />
                    <span className="link-txt">Search</span>
                </li>

                <li>
                    <NavLink to="explore">
                        <SvgIcon iconName="explore" className="normal" />
                        <SvgIcon iconName="explore-bold" className="bold" />
                        <span className="link-txt">Explore</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="reels">
                        <SvgIcon iconName="reels" />
                        <span className="link-txt">Reels</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="messages">
                        <SvgIcon iconName="messenger" />
                        <span className="link-txt">Messages</span>
                    </NavLink>
                </li>

                <li>
                    <SvgIcon iconName="heart" />
                    <span className="link-txt">Notifications</span>
                </li>

                <li onClick={() => onOpenCreateModal()}>
                    <SvgIcon iconName="addFeed" />
                    <span className="link-txt">Create</span>
                </li>

                <li className="btn-profile">
                    <NavLink to={`user/${user._id}`}>
                        <img className="user-img" src={user.imgUrl} alt="" />
                        <span className="link-txt">Profile</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="https://www.threads.net/?xmt=AQGzXUqqEb9xb-HuqkLyKZMoTtPiJ5GimIdR-VpPWsD2kxA">
                        <SvgIcon iconName="threads" />
                        <span className="link-txt">Threads</span>
                    </NavLink>
                </li>

                <li className="more-options" onClick={onOpenToolTip}>
                    <SvgIcon iconName="more" />
                    <span className="link-txt">More</span>
                </li>
            </ul>

            <div className="tool-tip" ref={elToolTipRef}>
                <p onClick={onLogout}>Log out</p>
            </div>

        </nav>
    )
}