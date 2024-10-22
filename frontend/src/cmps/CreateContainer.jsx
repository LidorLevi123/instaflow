import { SvgIcon } from "./SvgIcon";

export function CreateContainer({ user, localImgUrl }) {
    return (
        <section className="create-container">
            <img src={localImgUrl} alt="Local image" className="local-img" />

            <div className="uploader">
                <img src={user.imgUrl} alt="Uploader img" />
                <span className="btn fullname">{user.username}</span>
            </div>

            <textarea name="" id=""></textarea>

            <div>
                <SvgIcon iconName="emojiBig" />
                <span><span className="txt-count">0</span>/2,200</span>
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