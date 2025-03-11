import { FeedExploreList } from "./FeedExploreList";
import { FeedList } from "./FeedList";
import { UserFeedList } from "./UserFeedList";

export function FeedGallery({ type, ...restOfProps}) {
    const cmpTypes = {
        explore: <FeedExploreList { ...restOfProps }/>,
        list: <FeedList { ...restOfProps }/>,
        'user-feeds': <UserFeedList { ...restOfProps }/>
    }

    return cmpTypes[type]
}