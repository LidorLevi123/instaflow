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
                        <SvgIcon iconName="logoTxt" />
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
                    <SvgIcon iconName="search" />Search
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

                <li onClick={() => onOpenCreateModal()}>
                    <SvgIcon iconName="addFeed" />Create
                </li>

                <li className="btn-profile">
                    <NavLink to={`user/${user._id}`}>
                        <img className="user-img" src={user.imgUrl} alt="" />
                        Profile
                    </NavLink>
                </li>

                <li>
                    <NavLink to="https://www.threads.net/?xmt=AQGzXUqqEb9xb-HuqkLyKZMoTtPiJ5GimIdR-VpPWsD2kxA">
                        <SvgIcon iconName="threads" />Threads
                    </NavLink>
                </li>

                <li className="more-options" onClick={onOpenToolTip}>
                    <SvgIcon iconName="more" />More
                </li>
            </ul>

            <div className="tool-tip" ref={elToolTipRef}>
                <p onClick={onLogout}>Log out</p>
            </div>

        </nav>
    )
}