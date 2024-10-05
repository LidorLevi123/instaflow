export function CommentPreview({ comment }) {

    return (
        <article className="comment-preview">
            <img src={comment.by.imgUrl} alt="" />
            <div>
                <span className="fullname">{comment.by.fullname}</span>
                <span className="txt">{comment.txt}</span>
            </div>
            <div>
                <span className="created-at">{comment.createdAt}</span>
                <span className="likes">{comment.likedBy?.length} likes</span>
                <span className="btn-reply">Reply</span>
            </div>
        </article>
    )
}