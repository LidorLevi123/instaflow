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
		const feedsCollection = await dbService.getCollection('feed')
		const feed = await feedsCollection.findOne(criteria)

		const commentObjIds = feed.commentIds.map(ObjectId.createFromHexString)
		const commentsCollection = await dbService.getCollection('comment')
		const commentsCursor = await commentsCollection.find({ _id: { $in: commentObjIds } })

		feed.comments = commentsCursor.toArray().map(comment => {
			delete comment.aboutFeedId
			return comment
		})

		delete feed.commentIds
		return feed
	} catch (err) {
		logger.error(`while finding feed ${feedId}`, err)
		throw err
	}
}

// async function getById(feedId) {
// 	try {
// 		const criteria = { _id: ObjectId.createFromHexString(feedId) }
// 		const collection = await dbService.getCollection('feed')

// 		const results = await collection
// 			.aggregate([
// 				{
// 					$match: criteria
// 				},
// 				{
// 					$lookup: {
// 						from: 'comment',
// 						localField: '_id',
// 						foreignField: 'aboutFeedId',
// 						as: 'comments',
// 					},
// 				},
// 			])
// 			.toArray()

// 		const feed = {
// 			...results[0],
// 			comments: results[0].comments.map(comment => {
// 				delete comment.aboutFeedId
// 				return comment
// 			})
// 		}

// 		delete feed.commentIds

// 		return feed
// 	} catch (err) {
// 		logger.error(`while finding feed ${feedId}`, err)
// 		throw err
// 	}
// }

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
		likedBy: feed.likedBy,
		commentIds: feed.commentIds
		// imgUrls: feed.imgUrls,
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