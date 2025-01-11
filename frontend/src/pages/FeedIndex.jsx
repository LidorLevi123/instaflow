import { Navigate, Outlet, useNavigate } from 'react-router'
import { NavBar } from '../cmps/NavBar'
import { useSearchParams } from 'react-router-dom'
import { FeedDetails } from '../cmps/FeedDetails'
import { FeedEdit } from '../cmps/FeedEdit'
import { useSelector } from 'react-redux'
import { saveComment, removeFeed, saveFeed } from '../store/actions/feed.actions'
import { logout } from '../store/actions/user.actions'

export function FeedIndex() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

    const [searchParams, setSearchParams] = useSearchParams()
    const feedId = searchParams.get('feedId')
    const isCreate = searchParams.get('create')

    const navigate = useNavigate()

    function onOpenCreateModal(feedId = '') {
        const param = feedId ? feedId : 'new'
        searchParams.set('create', param)
        setSearchParams(searchParams)
        document.title = 'Create new post • Instaflow'
    }

    function onCloseCreateModal() {
        searchParams.delete('create')
        setSearchParams(searchParams)
        document.title = 'Instaflow'
    }

    async function onToggleLike(feed, elBtnLike) {
        try {
            const feedToSave = {
                ...feed,
                likedBy: [...feed.likedBy, loggedinUser]
            }
            if (feed.likedBy.some(user => user.username === loggedinUser.username)) {
                feedToSave.likedBy = feedToSave.likedBy.filter(user => user.username !== loggedinUser.username)
                elBtnLike.classList.remove('like-animation')
            } else {
                elBtnLike.classList.add('like-animation')
            }
            return await saveFeed(feedToSave)
        } catch (err) {
            console.log(err, 'Could not like feed')
        }
    }

    async function onAddComment(feedId, comment) {
        try {
            return await saveComment(feedId, comment)
        } catch (err) {
            console.log('Could not add comment', err)
        }
    }

    async function onLogout() {
		try {
			await logout()
			navigate('login')
		} catch (err) {
			console.log('Cannot logout')
		}
	}

    async function onRemoveFeed(feedId) {
        try {
            await removeFeed(feedId)
        } catch (err) {
            console.log('Cannot remove feed')
        }
    }

    const detailsProps = {
        onToggleLike,
        onAddComment,
        onRemoveFeed,
        onOpenCreateModal,
        loggedinUser,
        feedId
    }

    const outletContext = {
        onToggleLike,
        onAddComment,
        onRemoveFeed,
        onOpenCreateModal,
        loggedinUser
    }

    if(!loggedinUser) return <Navigate to="login"></Navigate>

    return (
        <section className="feed-index main-layout">
            <NavBar onOpenCreateModal={onOpenCreateModal} user={loggedinUser} onLogout={onLogout} />
            <Outlet context={outletContext} />
            {feedId && <FeedDetails {...detailsProps} />}
            {isCreate && <FeedEdit onClose={onCloseCreateModal} user={loggedinUser} />}
        </section>
    )
}