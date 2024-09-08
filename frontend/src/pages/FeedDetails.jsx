import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadFeed, addFeedMsg } from '../store/actions/feed.actions'


export function FeedDetails() {

  const {feedId} = useParams()
  const feed = useSelector(storeState => storeState.feedModule.feed)

  useEffect(() => {
    // loadFeed(feedId)
  }, [feedId])

  async function onAddFeedMsg(feedId) {
    try {
        await addFeedMsg(feedId, 'bla bla ' + parseInt(Math.random()*10))
        showSuccessMsg(`Feed msg added`)
    } catch (err) {
        showErrorMsg('Cannot add feed msg')
    }        

}

  return (
    <section className="feed-details">
      <Link to="/feed">Back to list</Link>
      <h1>Feed Details</h1>
      {feed && <div>
        <h3>{feed.vendor}</h3>
        <h4>${feed.price}</h4>
        <pre> {JSON.stringify(feed, null, 2)} </pre>
      </div>
      }
      <button onClick={() => { onAddFeedMsg(feed._id) }}>Add feed msg</button>

    </section>
  )
}