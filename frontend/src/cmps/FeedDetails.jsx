import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { feedService } from '../services/feed'
import { getTimeSince } from '../services/util.service'

import { SvgIcon } from './SvgIcon'
import { AddComment } from './AddComment'
import { CommentList } from './CommentList'
import { Backdrop } from './Backdrop'

export function FeedDetails({ feedId, onToggleLike, loggedinUser, onAddComment }) {
    const [feed, setFeed] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const elBtnLikeRef = useRef()

    useEffect(() => {
        loadFeed()
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
            const savedFeed = await onAddComment(feed._id, comment)
            setFeed(prevFeed => ({ ...prevFeed, comments: [...savedFeed.comments] }))
        } catch (err) {
            console.log('Could not add comment', err)
        }
    }

    async function onLikeFeed() {
        const savedFeed = await onToggleLike(feed, elBtnLikeRef.current)
        setFeed(prevFeed => ({ ...prevFeed, likedBy: savedFeed.likedBy }))
    }

    async function onLikeComment(comment, elBtnLike) {
        try {
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

            const savedComment = await feedService.saveComment(feed._id, commentToSave)
            setFeed(prevFeed => ({
                    ...prevFeed,
                    comments: prevFeed.comments.map(comment => comment.id === savedComment.id ? savedComment : comment)
                }))
        } catch (err) {
            console.log(err, 'Could not like comment')
        }
    }

    function isCommentLiked(comment) {
        return comment.likedBy.some(user => user._id === loggedinUser._id)
    }

    function isLiked() {
        return feed.likedBy.some(user => user.username === loggedinUser.username)
    }

    function onCloseDetails() {
        searchParams.delete('feedId')
        setSearchParams(searchParams)
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
                    <SvgIcon iconName="options" className="options-icon" />
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
                    <CommentList
                        comments={feed.comments}
                        onLikeComment={onLikeComment}
                        isCommentLiked={isCommentLiked} />
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