export function ImgAdjustments({ adjustments, handleChange }) {

    return (
        <ul className="img-adjustments">
            {adjustments.map(({ name, min, max, value }) =>
                <li key={name}>
                    <p>{name}</p>
                    <input type="range" name={name} min={min} max={max} value={value} onChange={handleChange} />
                    <span>{value}</span>
                </li>)
            }
        </ul>
    )
}