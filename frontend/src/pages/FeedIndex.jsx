import { Outlet } from 'react-router'
import { NavBar } from '../cmps/NavBar'
import { useSearchParams } from 'react-router-dom'
import { FeedDetails } from '../cmps/FeedDetails'
import { FeedEdit } from '../cmps/FeedEdit'
import { useSelector } from 'react-redux'

export function FeedIndex() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

    const [searchParams, setSearchParams] = useSearchParams()
    const feedId = searchParams.get('feedId')
    const isCreate = searchParams.get('create')

    function onOpenCreateModal() {
        searchParams.set('create', true)
        setSearchParams(searchParams)
        document.title = 'Create new post • Instaflow'
    }

    function onCloseCreateModal() {
        searchParams.delete('create')
        setSearchParams(searchParams)
        document.title = 'Instaflow'
    }

    return (
        <section className="feed-index main-layout">
            <NavBar onOpenCreateModal={onOpenCreateModal} user={loggedinUser}/>
            <Outlet />
            {feedId && <FeedDetails feedId={feedId} user={loggedinUser}/>}
            {isCreate && <FeedEdit onClose={onCloseCreateModal} user={loggedinUser}/>}
        </section>
    )
}