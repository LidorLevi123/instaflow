import { useEffect, useRef, useState } from "react";
import { SvgIcon } from "./SvgIcon";
import { Backdrop } from "./Backdrop";
import Picker from '@emoji-mart/react'

export function CreateContainer({ user, localImgUrl, handleChange, feedTxt, MAX_LENGTH }) {
    const [isEmojiPickerShown, setIsEmojiPickerShown] = useState(false)
    const emojiPickerRef = useRef()
    const emojiBtnRef = useRef()

    useEffect(() => {
        window.addEventListener('click', handleClickOutside)

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    function handleClickOutside(ev) {
        if (emojiPickerRef.current && 
           !emojiPickerRef.current.contains(ev.target) &&
           !emojiBtnRef.current.contains(ev.target)) {
            onHideEmojiPicker()
        }
    }

    function onShowEmojiPicker() {
        setIsEmojiPickerShown(true)
    }

    function onHideEmojiPicker() {
        setIsEmojiPickerShown(false)
    }

    function onAppendEmoji({ native: emoji }) {
        const customEv = {
            target: {
                value: feedTxt + emoji,
                name: 'txt'
            }
        }
        handleChange(customEv)
    }

    return (
        <section className="create-container">
            <img src={localImgUrl} alt="Local image" className="local-img" />

            <div className="uploader">
                <img src={user.imgUrl} alt="Uploader img" />
                <span className="fullname">{user.username}</span>
            </div>

            <textarea name="txt" onChange={handleChange} value={feedTxt}></textarea>

            <div className="emoji-txt" ref={emojiBtnRef}>
                <SvgIcon iconName="emojiBig" className="icon" onClick={onShowEmojiPicker} />
                <span className="txt-count"><span>{feedTxt.length}</span>/{MAX_LENGTH.toLocaleString()}</span>
            </div>

            <div className="settings">
                <label>
                    <input type="text" placeholder="Add location" />
                    <SvgIcon iconName="location" />
                </label>

                <label>
                    <input type="text" placeholder="Add collaborators" />
                    <SvgIcon iconName="addCollabs" />
                </label>

                <label>
                    <span>Accessibility</span>
                    <SvgIcon iconName="chevronDown" />
                </label>

                <label>
                    <span>Advanced settings</span>
                    <SvgIcon iconName="chevronDown" />
                </label>
            </div>

            {isEmojiPickerShown &&
                <div className="emoji-picker" ref={emojiPickerRef}>
                    <Picker onEmojiSelect={onAppendEmoji} />
                </div>}
        </section>
    )
}