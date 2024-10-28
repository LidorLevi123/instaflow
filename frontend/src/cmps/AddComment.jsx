import { useRef } from 'react'
import { SvgIcon } from './SvgIcon'
import { useForm } from '../customHooks/useForm'
import { commentService } from '../services/comment'

export function AddComment({ onAddComment }) {
    const [comment, ,handleChange] = useForm(commentService.getEmptyComment())
    const txtRef = useRef()

    async function addComment() {
        try {
            await onAddComment(comment)
            txtRef.current.value = ''
        } catch (err) {
            console.log('Could not add comment', err)
        }
    }

    function onResize() {
        const elText = txtRef.current
        const maxHeight = 18 * 4

        if (!elText) return
        if (!elText.value) {
            elText.style.height = '18px'
            return
        }

        elText.style.height = 'auto'
        const contentHeight = elText.scrollHeight

        let newHeight = Math.min(contentHeight, maxHeight)
        elText.style.height = newHeight + 'px'

        if (contentHeight > maxHeight) {
            elText.style.overflowY = 'auto'
        } else {
            elText.style.overflowY = 'hidden'
        }
    }

    return (
        <section className="add-comment">
            <textarea
                ref={txtRef}
                placeholder="Add a comment..."
                name="txt"
                onChange={handleChange}
                onInput={onResize}></textarea>
            {comment.txt && <span className="btn-post" onClick={addComment}>Post</span>}
            <SvgIcon iconName="emoji" />
        </section>
    )
}