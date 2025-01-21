import { useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { getTimeSince } from "../services/util.service"
import { SvgIcon } from "./SvgIcon"
import { AddComment } from "./AddComment"
import { hideDynamicModal, showOptionsModal } from "../services/event-bus.service"
import { useFeedDetails } from "../customHooks/useFeedDetails"

export function FeedPreview({ feed, onToggleLike, loggedinUser, onAddComment, onRemoveFeed, onOpenCreateModal }) {
    const [onOpenDetails] = useFeedDetails(feed._id)
    const elBtnLikeRef = useRef()

    const likeCount = feed.likedBy.length.toLocaleString('en-US')
    const createdAt = getTimeSince(feed.createdAt)

    function isLiked() {
        return feed.likedBy.some(user => user.username === loggedinUser.username)
    }

    function onLike() {
        onToggleLike(feed, elBtnLikeRef.current)
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
        onOpenCreateModal(feed._id)
    }

    async function addComment(comment) {
        try {
            await onAddComment(feed._id, comment)
        } catch (err) {
            console.log('Could not add comment', err)
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
                hideDynamicModal()
            } catch (err) {
                console.log('Could not remove feed', err)
            }
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
                    <SvgIcon iconName="options" className="btn options-icon" onClick={onShowOptionsModal} />
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
                    <span className="view-comments" onClick={onOpenDetails}>View all {feed.commentIds?.length || 0} comments</span>
                    <AddComment onAddComment={addComment} />
                </section>
            </article>
        </>
    )
}