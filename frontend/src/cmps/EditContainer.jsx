import { ImgAdjustments } from "./ImgAdjustments";
import { ImgFilters } from "./ImgFilters";

export function EditContainer(props) {
    const {
        localImgUrl,
        isFilterList,
        setIsFilterList,
        selectedFilter,
        setSelectedFilter,
        adjustments,
        handleAdjustmentsChange
    } = props

    return (
        <section className="edit-container">
            <img src={localImgUrl} alt="Local image" className="local-img" />
            <div className="tabs">
                <div
                    onClick={() => setIsFilterList(true)}
                    className={isFilterList ? 'selected' : undefined}>Filters</div>
                <div
                    onClick={() => setIsFilterList(false)}
                    className={!isFilterList ? 'selected' : undefined}>Adjustments</div>
            </div>
            {isFilterList ?
                <ImgFilters
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter} /> :
                <ImgAdjustments
                    adjustments={adjustments}
                    handleChange={handleAdjustmentsChange} />
            }
        </section>
    )
}