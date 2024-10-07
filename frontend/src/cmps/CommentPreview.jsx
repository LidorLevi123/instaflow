import { getTimeSince } from "../services/util.service";
import { SvgIcon } from "./SvgIcon";

export function CommentPreview({ comment }) {
    return (
        <article className="comment-preview">
            <img src={comment.by.imgUrl} alt="" />
            <div className="user">
                <span className="btn fullname">{comment.by.fullname}</span>
                <span className="txt">{comment.txt}</span>
            </div>
            <span className="btn btn-like">
                <SvgIcon iconName="heartSmall" />
            </span>
            <div className="actions">
                <span className="created-at">{getTimeSince(comment.createdAt)}</span>
                <span className="likes">{comment.likedBy?.length} likes</span>
                <span className="btn-reply">Reply</span>
            </div>
        </article>
    )
}