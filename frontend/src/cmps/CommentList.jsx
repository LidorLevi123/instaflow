import { CommentPreview } from "./CommentPreview";

export function CommentList({ comments }) {

    return (
        <section>
            <ul className="comment-list">
                {comments.map(comment =>
                    <li key={comment.id}>
                        <CommentPreview comment={comment} />
                    </li>)}
            </ul>
        </section>
    )
}