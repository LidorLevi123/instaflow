export function ImgAdjustments({ adjustments, handleChange }) {

    return (
        <ul className="img-adjustments">
            {adjustments.map(({ name, min, max, value }) =>
                <li key={name}>
                    <p className="filter">{name}</p>
                    <span className="btn-reset">Reset</span>
                    <input type="range" name={name} min={min} max={max} value={value} onChange={handleChange} />
                    <span className="value">{value}</span>
                </li>)
            }
        </ul>
    )
}