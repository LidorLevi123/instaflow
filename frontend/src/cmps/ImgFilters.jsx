import { appService } from "../services/app.service"

export function ImgFilters({ selectedFilter, setSelectedFilter }) {
    const filters = appService.getImgFilters()

    return (
        <section>
            <ul className="img-filters">
                {filters.map(filter =>
                    <li 
                        key={filter} 
                        className={selectedFilter === filter ? 'selected' : ''} 
                        onClick={()=>setSelectedFilter(filter)}>
                        <img src={`https://www.instagram.com/images/instagram/xig/filters/${filter}.jpg?__d=www`} alt="" />
                        <span>{filter}</span>
                    </li>)
                }
            </ul>
        </section>
    )
}