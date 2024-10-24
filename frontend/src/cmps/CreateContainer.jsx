import { SvgIcon } from "./SvgIcon";

export function CreateContainer({ user, localImgUrl, handleChange, txtCount, MAX_LENGTH }) {
    return (
        <section className="create-container">
            <img src={localImgUrl} alt="Local image" className="local-img" />

            <div className="uploader">
                <img src={user.imgUrl} alt="Uploader img" />
                <span className="fullname">{user.username}</span>
            </div>

            <textarea name="txt" onChange={handleChange}></textarea>

            <div className="emoji-txt">
                <SvgIcon iconName="emojiBig" className="icon"/>
                <span className="txt-count"><span>{txtCount}</span>/{MAX_LENGTH.toLocaleString()}</span>
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
        </section>
    )
}