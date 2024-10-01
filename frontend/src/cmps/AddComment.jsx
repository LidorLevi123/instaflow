import { useRef, useState } from 'react'
import { SvgIcon } from './SvgIcon'

export function AddComment() {
    const [txt, setTxt] = useState('')
    const txtRef = useRef()

    function handleChange(ev) {
        const { value } = ev.target
        setTxt(value)
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
                placeholder="Add a comment..."
                ref={txtRef}
                onInput={onResize}
                onChange={handleChange}></textarea>
            { txt && <span className="btn-post">Post</span> }
            <SvgIcon iconName="emoji" />
        </section>
    )
}