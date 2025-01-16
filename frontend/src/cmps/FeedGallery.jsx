import { FeedExploreList } from "./FeedExploreList";
import { FeedList } from "./FeedList";
import { UserFeedList } from "./UserFeedList";

export function FeedGallery({ type, ...restOfProps}) {
    switch (type) {
        case 'explore':
            return <FeedExploreList { ...restOfProps }/>
        
        case 'list':
            return <FeedList { ...restOfProps }/>

        case 'user-feeds':
            return <UserFeedList { ...restOfProps }/>
        
        default:
            break;
    }
}