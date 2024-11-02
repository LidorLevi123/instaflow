import { useSearchParams } from "react-router-dom"

export function UserFeedList({ feeds }) {
    const [searchParams, setSearchParams] = useSearchParams()

    function onOpenDetails(feedId) {
        searchParams.set('feedId', feedId)
        setSearchParams(searchParams)
    }

    return (
        <ul className="user-feed-list">
            {
                feeds.map(feed =>
                    <li key={feed._id} onClick={() => onOpenDetails(feed._id)}>
                        <img src={feed.imgUrls[0]} alt="" />
                    </li>)
            }
        </ul>
    )
}