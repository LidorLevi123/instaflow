import { useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getTimeSince } from "../services/util.service"
import { SvgIcon } from "./SvgIcon"
import { AddComment } from "./AddComment"
import { OptionsModal } from "./OptionsModal"

export function FeedPreview({ feed, onToggleLike, loggedinUser, onAddComment, onRemoveFeed }) {
    const [isOptionsModalShown, setIsOptionsModalShown] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const likeCount = feed.likedBy.length.toLocaleString('en-US')
    const createdAt = getTimeSince(feed.createdAt)
    const elBtnLikeRef = useRef()

    function onOpenDetails() {
        searchParams.set('feedId', feed._id)
        setSearchParams(searchParams)
    }

    function onLike() {
        onToggleLike(feed, elBtnLikeRef.current)
    }

    function isLiked() {
        return feed.likedBy.some(user => user.username === loggedinUser.username)
    }

    function onShowOptionsModal() {
        setIsOptionsModalShown(true)
    }

    function onHideOptionsModal() {
        setIsOptionsModalShown(false)
    }

    async function addComment(comment) {
        try {
            await onAddComment(feed._id, comment)
        } catch (err) {
            console.log('Could not add comment', err)
        }
    }

    async function removeFeed() {
        try {
            await onRemoveFeed(feed._id)
            setIsOptionsModalShown(false)
        } catch (err) {
            console.log('Could not remove feed', err)
        }
    }

    return (
        <>
            <article className="feed-preview">
                <section className="uploader">
                    <img src={feed.by.imgUrl} alt="Uploader img" />
                    <span className="fullname">{feed.by.fullname}</span>
                    <span className="dot">•</span>
                    <span className="created-at">{createdAt}</span>
                    {
                        feed.by._id !== loggedinUser._id &&
                        <>
                            <span className="dot">•</span>
                            <span className="follow">Follow</span>
                        </>
                    }
                    <SvgIcon iconName="options" className="btn options-icon" onClick={onShowOptionsModal}/>
                </section>

                <img className="feed-img" src={feed.imgUrls[0]} alt="" />

                <section className="actions">
                    <span style={{ lineHeight: 0.5 }} ref={elBtnLikeRef}>
                        <SvgIcon iconName={isLiked() ? 'heartRed' : 'heart'}
                            onClick={onLike} className="btn-like" />
                    </span>
                    <SvgIcon iconName="comment" onClick={onOpenDetails} />
                    <SvgIcon iconName="share" />
                    <SvgIcon iconName="bookmark" />
                </section>

                <section className="details">
                    <span className="likes">{likeCount} likes</span>
                    <p className="txt">
                        <span className="fullname">{feed.by.fullname}</span>
                        {feed.txt || ''}
                    </p>
                    <span className="view-comments" onClick={onOpenDetails}>View all {feed.comments.length} comments</span>
                    <AddComment onAddComment={addComment} />
                </section>
            </article>

            {isOptionsModalShown &&
                <OptionsModal onClose={onHideOptionsModal}>
                    <ul>
                    {
                            feed.by._id === loggedinUser._id ?
                                <>
                                    <li className="danger" onClick={removeFeed}>Delete</li>
                                    <li>Edit</li>
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
                        <li onClick={onHideOptionsModal}>Cancel</li>
                    </ul>
                </OptionsModal>}
        </>
    )
}