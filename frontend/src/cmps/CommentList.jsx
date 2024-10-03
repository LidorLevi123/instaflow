export function CommentList({ comments }) {

    return (
        <section>
            <ul className="comment-list">
                        {comments.map(comment =>
                            <li className="comment-preview" key={comment.id}>
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
                            </li>)}
                    </ul>
        </section>
    )
}