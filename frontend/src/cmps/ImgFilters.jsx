import { appService } from "../services/app.service"

export function ImgFilters({ selectedFilter, setSelectedFilter }) {
    const filters = appService.getImgFilters()

    return (
        <ul className="img-filters">
            {filters.map(filter =>
                <li
                    key={filter}
                    className={selectedFilter === filter ? 'selected' : ''}
                    onClick={() => setSelectedFilter(filter)}>
                    <img src={`/img/${filter}.jpg`} alt="" />
                    <span>{filter}</span>
                </li>)
            }
        </ul>
    )
}