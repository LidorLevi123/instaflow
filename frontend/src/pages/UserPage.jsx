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
                <img src="https://res.cloudinary.com/dvpkhwyxp/image/upload/v1729242206/instaflow/tzq3es09mdch78lufntr.png" alt="" />
                <div>
                    <h3>{user.username}</h3>
                    <button>Edit profile</button>
                    <button>View archive</button>
                    <SvgIcon iconName="settings" />
                </div>
                <div>
                    <p><span className="bold">25</span>posts</p>
                    <p><span className="bold">150</span>followers</p>
                    <p><span className="bold">282</span>following</p>
                </div>
                <div>
                    <p className="bold">{user.fullname}</p>
                    <p>Ariel</p>
                </div>
            </header>

            <div>
                <p>
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