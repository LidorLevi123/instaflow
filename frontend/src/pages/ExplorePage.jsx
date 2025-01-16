import { useOutletContext } from "react-router"
import { FeedGallery } from "../cmps/FeedGallery"

export function ExplorePage() {
    const { feeds } = useOutletContext()
    
    return (
        <section className="explore-page">
            <FeedGallery type="explore" feeds={feeds}/>
        </section>
    )
}