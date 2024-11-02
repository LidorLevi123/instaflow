import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { userService } from "../services/user"
import { SvgIcon } from "../cmps/SvgIcon"

export function UserPage() {
    const [user, setUser] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadUser()
    }, [])

    async function loadUser() {
        const { userId } = params
        const user = await userService.getById(userId)
        setUser(user)
    }

    if (!user) return

    console.log(user)


    return (
        <section className="user-page">
            <header>
                <img className="user-img" src="https://res.cloudinary.com/dvpkhwyxp/image/upload/v1729242206/instaflow/tzq3es09mdch78lufntr.png" alt="" />
                <div className="actions">
                    <h3 className="user-name">{user.username}</h3>
                    <button className="bold">Edit profile</button>
                    <button className="bold">View archive</button>
                    <SvgIcon iconName="settings" />
                </div>
                <div className="summary">
                    <p><span className="bold">25</span>posts</p>
                    <p><span className="bold">150</span>followers</p>
                    <p><span className="bold">282</span>following</p>
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
        </section>
    )
}