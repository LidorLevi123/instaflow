import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { userService } from "../services/user"
import { SvgIcon } from "../cmps/SvgIcon"
import { FeedGallery } from "../cmps/FeedGallery"

export function UserPage() {
    const [user, setUser] = useState(null)
    const [currView, setCurrView] = useState('posts')
    const params = useParams()

    useEffect(() => {
        loadUser()
    }, [])

    async function loadUser() {
        const { userId } = params
        const user = await userService.getById(userId)
        setUser(user)
    }

    function onChangeView(view) {
        setCurrView(view)
    }

    if (!user) return

    const galleryOptions = ['posts', 'saved', 'tagged']

    return (
        <section className="user-page">
            <header>
                <img className="user-img" src={user.imgUrl} alt="" />
                <div className="actions">
                    <h3 className="user-name">{user.username}</h3>
                    <button className="bold">Edit profile</button>
                    <button className="bold">View archive</button>
                    <SvgIcon iconName="settings" />
                </div>
                <div className="summary">
                    <p><span className="bold">{user.feeds.length}</span>posts</p>
                    <p><span className="bold">{user.followers?.length || 0}</span>followers</p>
                    <p><span className="bold">{user.following?.length || 0}</span>following</p>
                </div>
                <div className="info">
                    <p className="fullname bold">{user.fullname}</p>
                    <p className="biography">Ariel</p>
                </div>
            </header>

            <div className="gallery-controller">
                {
                    galleryOptions.map(view =>
                        <p key={view} className={view === currView ? 'active' : ''} onClick={() => onChangeView(view)}>
                            <SvgIcon iconName={view} />
                            <span>{view}</span>
                        </p>)
                }
            </div>

            {currView === 'posts' && <FeedGallery type="user-feeds" feeds={user.feeds} />}
        </section>
    )
}