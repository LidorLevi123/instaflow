import { logger } from '../../services/logger.service.js'
import { feedService } from './feed.service.js'

export async function getFeeds(req, res) {
	try {
		const feeds = await feedService.query()
		res.json(feeds)
	} catch (err) {
		logger.error('Failed to get feeds', err)
		res.status(400).send({ err: 'Failed to get feeds' })
	}
}

export async function getFeedById(req, res) {
	try {
		const { id } = req.params
		const feed = await feedService.getById(id)
		res.json(feed)
	} catch (err) {
		logger.error('Failed to get feed', err)
		res.status(400).send({ err: 'Failed to get feed' })
	}
}

export async function addFeed(req, res) {
	const { loggedinUser } = req

	const feed = {
        txt: req.body.txt || '',
        imgUrls: req.body.imgUrls || [],
        comments: req.body.comments || [],
        likedBy: req.body.likedBy || [],
    }

	try {
		feed.by = loggedinUser
		const addedFeed = await feedService.add(feed)
		res.json(addedFeed)
	} catch (err) {
		logger.error('Failed to add feed', err)
		res.status(400).send({ err: 'Failed to add feed' })
	}
}

export async function updateFeed(req, res) {
	const { loggedinUser } = req
	const { _id: userId } = loggedinUser

	const feed = {
		_id: req.body._id || '',
        txt: req.body.txt || '',
        imgUrls: req.body.imgUrls || [],
        comments: req.body.comments || [],
        likedBy: req.body.likedBy || [],
    }

	// if (feed.by._id !== userId) {
	// 	res.status(403).send('Not your feed...')
	// 	return
	// }

	try {
		const updatedFeed = await feedService.update(feed)
		res.json(updatedFeed)
	} catch (err) {
		logger.error('Failed to update feed', err)
		res.status(400).send({ err: 'Failed to update feed' })
	}
}

export async function removeFeed(req, res) {
	try {
		const { id } = req.params
		const removedId = await feedService.remove(id)

		res.send(removedId)
	} catch (err) {
		logger.error('Failed to remove feed', err)
		res.status(400).send({ err: 'Failed to remove feed' })
	}
}

export async function addCarMsg(req, res) {
	const { loggedinUser } = req

	try {
		const carId = req.params.id
		const msg = {
			txt: req.body.txt,
			by: loggedinUser,
		}
		const savedMsg = await carService.addCarMsg(carId, msg)
		res.json(savedMsg)
	} catch (err) {
		logger.error('Failed to update car', err)
		res.status(400).send({ err: 'Failed to update car' })
	}
}

export async function removeCarMsg(req, res) {
	try {
		const carId = req.params.id
		const { msgId } = req.params

		const removedId = await carService.removeCarMsg(carId, msgId)
		res.send(removedId)
	} catch (err) {
		logger.error('Failed to remove car msg', err)
		res.status(400).send({ err: 'Failed to remove car msg' })
	}
}
