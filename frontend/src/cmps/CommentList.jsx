import { CommentPreview } from "./CommentPreview";

export function CommentList({ comments, onLikeComment, isCommentLiked }) {

    return (
        <section>
            <ul className="comment-list">
                {comments.map(comment =>
                    <li key={comment.id}>
                        <CommentPreview comment={comment} onLikeComment={onLikeComment} isCommentLiked={isCommentLiked}/>
                    </li>)}
            </ul>
        </section>
    )
}