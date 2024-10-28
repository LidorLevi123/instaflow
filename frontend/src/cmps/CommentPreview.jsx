import { useRef, useState } from "react";
import { getTimeSince } from "../services/util.service";
import { SvgIcon } from "./SvgIcon";
import { OptionsModal } from "./OptionsModal";

export function CommentPreview({ comment, onLikeComment, isCommentLiked, onRemoveComment, loggedinUser }) {
    const elBtnLikeRef = useRef()
    const [isOptionsModalShown, setIsOptionsModalShown] = useState(false)

    function onShowOptionsModal() {
        setIsOptionsModalShown(true)
    }

    function onHideOptionsModal() {
        setIsOptionsModalShown(false)
    }

    return (
        <>
            <article className="comment-preview">
                <img src={comment.by.imgUrl} alt="" />
                <div className="user">
                    <span className="btn fullname">{comment.by.fullname}</span>
                    <span className="txt">{comment.txt}</span>
                </div>
                <span style={{ lineHeight: 0.5 }} ref={elBtnLikeRef}>
                    <SvgIcon
                        iconName={isCommentLiked(comment) ? 'heartSmallRed' : 'heartSmall'}
                        onClick={() => onLikeComment(comment, elBtnLikeRef.current)}
                        className="btn btn-like" />
                </span>
                <div className="actions">
                    <span className="created-at">{getTimeSince(comment.createdAt)}</span>
                    <span className="likes">{comment.likedBy?.length} likes</span>
                    <span className="btn-reply">Reply</span>
                    <SvgIcon iconName="options" className="options-icon" onClick={onShowOptionsModal} />
                </div>
            </article>

            {isOptionsModalShown &&
                <OptionsModal onClose={onHideOptionsModal}>
                    <ul>
                        {
                            comment.by._id === loggedinUser._id ?
                                <li className="danger" onClick={() => onRemoveComment(comment.id)}>Delete</li> :
                                <li className="danger">Report</li>
                        }
                        <li onClick={onHideOptionsModal}>Cancel</li>
                    </ul>
                </OptionsModal>}
        </>
    )
}