import { ObjectId } from 'mongodb'

import { logger } from '../../services/logger.service.js'
import { makeId } from '../../services/util.service.js'
import { dbService } from '../../services/db.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'

const PAGE_SIZE = 3

export const feedService = {
	remove,
	query,
	getById,
	add,
	update,
	addFeedComment,
	removeFeedComment,
}

async function query(criteria = {}) {
	try {
		// const criteria = _buildCriteria(filterBy)
		const sort = _buildSort()

		const collection = await dbService.getCollection('feed')
		const feedCursor = await collection.find(criteria, { sort })

		// if (filterBy.pageIdx !== undefined) {
		// 	feedCursor.skip(filterBy.pageIdx * PAGE_SIZE).limit(PAGE_SIZE)
		// }

		const feeds = await feedCursor.toArray()
		return feeds
	} catch (err) {
		logger.error('cannot find feeds', err)
		throw err
	}
}

async function getById(feedId) {
	try {
		const criteria = { _id: ObjectId.createFromHexString(feedId) }
		const collection = await dbService.getCollection('feed')
		const feed = await collection.findOne(criteria)

		return feed
	} catch (err) {
		logger.error(`while finding car ${feedId}`, err)
		throw err
	}
}

async function remove(feedId) {
	// const { loggedinUser } = asyncLocalStorage.getStore()
	// const { _id: ownerId, isAdmin } = loggedinUser

	try {
		const criteria = {
			_id: ObjectId.createFromHexString(feedId),
		}
		// if(!isAdmin) criteria['owner._id'] = ownerId

		const collection = await dbService.getCollection('feed')
		const res = await collection.deleteOne(criteria)

		if (res.deletedCount === 0) throw ('Not your feed')
		return feedId
	} catch (err) {
		logger.error(`cannot remove feed ${feedId}`, err)
		throw err
	}
}

async function add(feed) {
	try {
		const collection = await dbService.getCollection('feed')
		await collection.insertOne(feed)

		return feed
	} catch (err) {
		logger.error('cannot insert feed', err)
		throw err
	}
}

async function update(feed) {
	const feedToSave = {
		txt: feed.txt,
		likedBy: feed.likedBy
		// imgUrls: feed.imgUrls,
		// comments: feed.comments,
	}
	try {
		const criteria = { _id: ObjectId.createFromHexString(feed._id) }

		const collection = await dbService.getCollection('feed')
		await collection.updateOne(criteria, { $set: feedToSave })

		return feed
	} catch (err) {
		logger.error(`cannot update feed ${feed._id}`, err)
		throw err
	}
}

async function addFeedComment(feedId, comment) {
	try {
		const criteria = { _id: ObjectId.createFromHexString(feedId) }
		comment.id = makeId()
		comment.createdAt = Date.now()

		const collection = await dbService.getCollection('feed')
		await collection.updateOne(criteria, { $push: { comments: comment } })

		return comment
	} catch (err) {
		logger.error(`cannot add feed comment ${carId}`, err)
		throw err
	}
}

async function removeFeedComment(feedId, commentId) {
	try {
		const criteria = { _id: ObjectId.createFromHexString(feedId) }

		const collection = await dbService.getCollection('feed')
		await collection.updateOne(criteria, { $pull: { comments: { id: commentId } } })

		return commentId
	} catch (err) {
		logger.error(`cannot remove feed comment ${feedId}`, err)
		throw err
	}
}

function _buildCriteria(filterBy) {
	// const criteria = {
	// 	vendor: { $regex: filterBy.txt, $options: 'i' },
	// 	speed: { $gte: filterBy.minSpeed },
	// }

	return {}
}

function _buildSort() {
	return { _id: -1 }
}