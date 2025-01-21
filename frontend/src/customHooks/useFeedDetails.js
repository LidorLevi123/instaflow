import { useSearchParams } from "react-router-dom"

export const useFeedDetails = (feedId) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const open = (_feedId) => {
        const param = feedId ? feedId : _feedId
        searchParams.set('feedId', param)
        setSearchParams(searchParams)
    }

    const close = () => {
        searchParams.delete('feedId')
        setSearchParams(searchParams)
    }

    return [open, close]
}