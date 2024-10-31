import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { userService } from "../services/user"

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

    if(!user) return

    return (
        <section className="user-page">
            <h1>{user.username}</h1>
        </section>
    )
}