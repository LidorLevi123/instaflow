import { CommentPreview } from "./CommentPreview";

export function CommentList({ comments, onLikeComment, isCommentLiked, loggedinUser }) {

    const previewProps = {
        onLikeComment,
        isCommentLiked,
        loggedinUser
    }

    return (
        <section>
            <ul className="comment-list">
                {comments.map(comment =>
                    <li key={comment.id}>
                        <CommentPreview comment={comment} {...previewProps}/>
                    </li>)}
            </ul>
        </section>
    )
}