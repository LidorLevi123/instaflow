import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { feedService } from '../services/feed'
import { commentService } from '../services/comment'
import { getTimeSince } from '../services/util.service'
import { eventBus, hideDynamicModal, showOptionsModal } from '../services/event-bus.service'

import { removeComment } from '../store/actions/feed.actions'

import { SvgIcon } from './SvgIcon'
import { AddComment } from './AddComment'
import { CommentList } from './CommentList'
import { Backdrop } from './Backdrop'

export function FeedDetails({ feedId, onToggleLike, loggedinUser, onAddComment, onRemoveFeed, onOpenCreateModal }) {
    const [feed, setFeed] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const elBtnLikeRef = useRef()

    useEffect(() => {
        loadFeed()

        const unsubscribe = eventBus.on('feed-edit', feed => setFeed(feed))
        return unsubscribe
    }, [])

    async function loadFeed() {
        try {
            const feed = await feedService.getById(feedId)
            setFeed(feed)
        } catch (err) {
            console.log('Cannot load feed', err)
            throw err
        }
    }

    async function addComment(comment) {
        try {
            const savedComment = await onAddComment(feed._id, comment)
            setFeed(prevFeed => ({
                ...prevFeed,
                comments: prevFeed.comments ? [savedComment, ...prevFeed.comments] : [savedComment]
            }))
        } catch (err) {
            console.log('Could not add comment', err)
        }
    }

    async function onRemoveComment(commentId) {
        try {
            await removeComment(feed._id, commentId)

            setFeed(prevFeed => ({
                ...prevFeed,
                comments: prevFeed.comments.filter(c => c._id !== commentId)
            }))

            hideDynamicModal()
        } catch (err) {
            console.log('Could not remove comment', err)
        }
    }

    function removeFeed() {
        showOptionsModal(() =>
            <>
                <div className="feed-remove-approval">
                    <h2>Delete post?</h2>
                    <p>Are you sure you want to delete this post?</p>
                </div>
                <ul>
                    <li className="danger" onClick={_removeFeed}>Delete</li>
                    <li onClick={hideDynamicModal}>Cancel</li>
                </ul>
            </>)

        async function _removeFeed() {
            try {
                await onRemoveFeed(feed._id)
                onCloseDetails()
                hideDynamicModal()
            } catch (err) {
                console.log('Could not remove feed', err)
            }
        }
    }

    async function onLikeFeed() {
        const savedFeed = await onToggleLike(feed, elBtnLikeRef.current)
        setFeed(prevFeed => ({ ...prevFeed, likedBy: savedFeed.likedBy }))
    }

    async function onLikeComment(comment, elBtnLike) {
        try {
            if (!comment.likedBy) comment.likedBy = []

            const commentToSave = {
                ...comment,
                likedBy: [...comment.likedBy, loggedinUser]
            }

            if (isCommentLiked(comment)) {
                commentToSave.likedBy = commentToSave.likedBy.filter(user => user._id !== loggedinUser._id)
                elBtnLike.classList.remove('like-animation')
            } else {
                elBtnLike.classList.add('like-animation')
            }

            const savedComment = await commentService.save(feed._id, commentToSave)
            setFeed(prevFeed => ({
                ...prevFeed,
                comments: prevFeed.comments.map(comment => comment._id === savedComment._id ? savedComment : comment)
            }))
        } catch (err) {
            console.log(err, 'Could not like comment')
        }
    }

    function isCommentLiked(comment) {
        return comment.likedBy?.some(user => user._id === loggedinUser._id)
    }

    function isLiked() {
        return feed.likedBy.some(user => user.username === loggedinUser.username)
    }

    function onCloseDetails() {
        searchParams.delete('feedId')
        setSearchParams(searchParams)
    }

    function onShowOptionsModal() {
        const OptionsList = () =>
            <ul>
                {
                    feed.by._id === loggedinUser._id ?
                        <>
                            <li className="danger" onClick={removeFeed}>Delete</li>
                            <li onClick={onEditFeed}>Edit</li>
                            <li>Hide like count to others</li>
                            <li>Turn off commenting</li>
                        </> :
                        <>
                            <li className="danger">Report</li>
                            <li className="danger">Unfollow</li>
                            <li>Add to favorites</li>
                        </>
                }
                <li>Go to post</li>
                <li>Share to...</li>
                <li>Copy link</li>
                <li>Embed</li>
                <li>About this account</li>
                <li onClick={hideDynamicModal}>Cancel</li>
            </ul>

        showOptionsModal(OptionsList)
    }

    function onEditFeed() {
        hideDynamicModal()
        onOpenCreateModal(feedId)
    }

    if (!feed) return

    const createdAt = getTimeSince(feed.createdAt)

    return (
        <>
            <Backdrop onClose={onCloseDetails} />
            <section className="feed-details">

                <img src={feed.imgUrls[0]} alt="" className="feed-img" />

                <div className="uploader">
                    <img src={feed.by.imgUrl} alt="Uploader img" />
                    <span className="btn fullname">{feed.by.fullname}</span>
                    <SvgIcon iconName="options" className="btn options-icon" onClick={onShowOptionsModal} />
                </div>

                <div className="info">
                    <div>
                        <img src={feed.by.imgUrl} alt="Uploader img" />
                        <div>
                            <span className="btn fullname">{feed.by.fullname}</span>
                            <span className="txt">{feed.txt || ''}</span>
                        </div>
                        <span className="created-at">{createdAt}</span>
                    </div>
                    {feed.comments &&
                        <CommentList
                            comments={feed.comments}
                            onLikeComment={onLikeComment}
                            isCommentLiked={isCommentLiked}
                            onRemoveComment={onRemoveComment}
                            loggedinUser={loggedinUser} />}
                </div>

                <div className="bottom-section">
                    <section className="actions">
                        <span style={{ lineHeight: 0.5 }} ref={elBtnLikeRef}>
                            <SvgIcon
                                iconName={isLiked() ? 'heartRed' : 'heart'}
                                onClick={onLikeFeed}
                                className="btn-like" />
                        </span>
                        <SvgIcon iconName="comment" />
                        <SvgIcon iconName="share" />
                        <SvgIcon iconName="bookmark" />
                    </section>

                    <span className="likes">{feed.likedBy?.length} likes</span>
                    <span className="created-at">{createdAt} ago</span>

                    <AddComment onAddComment={addComment} />
                </div>
            </section>
        </>
    )
}