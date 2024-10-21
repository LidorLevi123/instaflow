
export function CropContainer({ localImgUrl }) {

    return (
        <section className="crop-container">
            <img src={localImgUrl} alt="Local image" className="local-img" />
        </section>
    )
}