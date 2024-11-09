import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { userService } from "../services/user"
import { SvgIcon } from "../cmps/SvgIcon"
import { UserFeedList } from "../cmps/UserFeedList"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"

export function UserPage() {
    const [user, setUser] = useState(null)
    const [userFeeds, setUserFeeds] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadUser()
    }, [])

    useEffectUpdate(() => {
        loadUserFeeds()
    }, [user])

    async function loadUser() {
        const { userId } = params
        const user = await userService.getById(userId)
        setUser(user)
    }

    async function loadUserFeeds() {
        if(!user) return
        const feeds = await userService.getUserFeeds(user._id)
        setUserFeeds(feeds)
    }

    if (!user || !userFeeds) return

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
                    <p><span className="bold">{userFeeds.length}</span>posts</p>
                    <p><span className="bold">{user.followers?.length || 0}</span>followers</p>
                    <p><span className="bold">{user.following?.length || 0}</span>following</p>
                </div>
                <div className="info">
                    <p className="fullname bold">{user.fullname}</p>
                    <p className="biography">Ariel</p>
                </div>
            </header>

            <div className="gallery-controller">
                <p className="active">
                    <SvgIcon iconName="posts" />
                    <span>Posts</span>
                </p>
                <p>
                    <SvgIcon iconName="saved" />
                    <span>Saved</span>
                </p>
                <p>
                    <SvgIcon iconName="tagged" />
                    <span>Tagged</span>
                </p>
            </div>

            <UserFeedList feeds={userFeeds}/>
        </section>
    )
}