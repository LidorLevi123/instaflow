import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router"
import { userService } from "../services/user"
import { SvgIcon } from "../cmps/SvgIcon"
import { FeedGallery } from "../cmps/FeedGallery"
import { uploadService } from "../services/upload.service"

export function UserPage() {
    const loggedinUser = useSelector(state => state.userModule.loggedinUser)
    const [user, setUser] = useState(null)
    const [currView, setCurrView] = useState('posts')
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        loadUser()
    }, [params.userId])

    async function loadUser() {
        const { userId } = params
        const user = await userService.getById(userId)
        setUser(user)
    }

    async function uploadImg(ev) {
        try {
            const { secure_url } = await uploadService.uploadImg(ev)
            user.imgUrl = secure_url

            const savedUser = await userService.update(user)
            if (loggedinUser._id === user._id) dispatch({ type: 'SET_LOGGEDIN_USER', user: savedUser })
            setUser(prevUser => ({ ...prevUser, imgUrl: secure_url }))
        } catch (err) {
            console.log('Could not change profile picture', err)
        }
    }

    async function onFollow() {
        try {
            await userService.follow(user._id)
            setUser(prevUser => ({...prevUser, followers: [...prevUser.followers, loggedinUser]}))
        } catch (err) {
            console.log('Could not follow user', err)
        }
    }

    async function onUnFollow() {
        try {
            await userService.unfollow(user._id)
            setUser(prevUser => ({...prevUser, followers: prevUser.followers.filter(follower => follower._id !== loggedinUser._id)}))
        } catch (err) {
            console.log('Could not follow user', err)
        }
    }

    function onChangeView(view) {
        setCurrView(view)
    }

    function isFollowing() {
        return user.followers.some(follower => follower._id === loggedinUser._id)
    }

    if (!user) return

    const galleryViews = ['posts', 'saved', 'tagged']

    return (
        <section className="user-page">
            <header>
                <section className="user-img">
                    {
                        loggedinUser._id === user._id &&
                        <>
                            <label
                                htmlFor="file-input"
                                title={loggedinUser._id === user._id ? 'Change profile picture' : 'View'}>
                            </label>
                            <input type="file" id="file-input" onChange={uploadImg} />
                        </>
                    }
                    <img src={user.imgUrl} />
                </section>
                <div className="actions">
                    <h3 className="user-name">{user.username}</h3>
                    {
                        loggedinUser._id === user._id ?
                            <>
                                <button className="bold">Edit profile</button>
                                <button className="bold">View archive</button>
                                <SvgIcon iconName="settings" />
                            </> :
                            <>
                                { 
                                    isFollowing() ? 
                                        <button className="btn-follow bold following" onClick={onUnFollow} title="Unfollow">
                                            Following
                                            <SvgIcon iconName="chevronDown"/>
                                        </button> :
                                        <button className="btn-follow bold" onClick={onFollow}>Follow</button>
                                    }
                                <button className="bold">Message</button>
                                <SvgIcon iconName="options" className="options-svg"/>
                            </>
                    }
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
                    galleryViews.map(view =>
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