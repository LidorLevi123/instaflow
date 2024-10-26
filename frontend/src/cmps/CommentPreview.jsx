import { useRef } from "react";
import { getTimeSince } from "../services/util.service";
import { SvgIcon } from "./SvgIcon";

export function CommentPreview({ comment, onLikeComment, isCommentLiked }) {
    const elBtnLikeRef = useRef()

    return (
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
            </div>
        </article>
    )
}