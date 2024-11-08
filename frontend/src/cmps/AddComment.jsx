import { useRef, useState } from 'react'
import { SvgIcon } from './SvgIcon'
import { useForm } from '../customHooks/useForm'
import { commentService } from '../services/comment'
import { Backdrop } from "./Backdrop"
import Picker from '@emoji-mart/react'

export function AddComment({ onAddComment }) {
    const [comment, setComment, handleChange] = useForm(commentService.getEmptyComment())
    const [isEmojiPickerShown, setIsEmojiPickerShown] = useState(false)
    const txtRef = useRef()

    async function addComment() {
        try {
            await onAddComment(comment)
            setComment(commentService.getEmptyComment())
        } catch (err) {
            console.log('Could not add comment', err)
        }
    }

    function onShowEmojiPicker() {
        setIsEmojiPickerShown(true)
    }

    function onHideEmojiPicker() {
        setIsEmojiPickerShown(false)
    }

    function onAppendEmoji({ native: emoji }) {
        setComment(prevComment => ({...prevComment, txt: prevComment.txt + emoji}))
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
                value={comment.txt}
                onInput={onResize}></textarea>
            {comment.txt && <span className="btn-post" onClick={addComment}>Post</span>}
            <SvgIcon iconName="emoji" onClick={onShowEmojiPicker} />

            {isEmojiPickerShown &&
                <div className="emoji-picker">
                    <Backdrop onClose={onHideEmojiPicker} />
                    <Picker onEmojiSelect={onAppendEmoji} />
                </div>}
        </section>
    )
}