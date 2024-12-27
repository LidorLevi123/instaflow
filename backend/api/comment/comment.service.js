import { ObjectId } from 'mongodb'

import { asyncLocalStorage } from '../../services/als.service.js'
import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'

export const commentService = { query, remove, add }

async function query(filterBy = {}) {
	try {
		const criteria = _buildCriteria(filterBy)
		const collection = await dbService.getCollection('comment')
        
		var comments = await collection.aggregate([
            {
                $match: criteria,
            },
            {
                $lookup: {
                    localField: 'byUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser',
                },
            },
            {
                $unwind: '$byUser',
            },
            {
                $lookup: {
                    localField: 'aboutUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'aboutUser',
                },
            },
            {
                $unwind: '$aboutUser',
            },
        ]).toArray()

		comments = comments.map(comment => {
			comment.byUser = { 
                _id: comment.byUser._id, 
                fullname: comment.byUser.fullname 
            }
			comment.aboutUser = { 
                _id: comment.aboutUser._id, 
                fullname: comment.aboutUser.fullname 
            }
			delete comment.byUserId
			delete comment.aboutUserId
			return comment
		})

		return comments
	} catch (err) {
		logger.error('cannot get comments', err)
		throw err
	}
}

async function remove(commentId) {
	try {
		const { loggedinUser } = asyncLocalStorage.getStore()
		const collection = await dbService.getCollection('comment')

		const criteria = { _id: ObjectId.createFromHexString(commentId) }

        // remove only if user is owner/admin
		if (!loggedinUser.isAdmin) {
            criteria.byUserId = ObjectId.createFromHexString(loggedinUser._id)
        }

        const { deletedCount } = await collection.deleteOne(criteria)
		return deletedCount
	} catch (err) {
		logger.error(`cannot remove comment ${commentId}`, err)
		throw err
	}
}

async function add(comment) {
    try {
        const commentToAdd = {
            ...comment,
			aboutFeedId: ObjectId.createFromHexString(comment.aboutFeedId),
			txt: comment.txt,
		}
		const collection = await dbService.getCollection('comment')
		await collection.insertOne(commentToAdd)
        
		return commentToAdd
	} catch (err) {
		logger.error('cannot add comment', err)
		throw err
	}
}

function _buildCriteria(filterBy) {
	const criteria = {}

	if (filterBy.byUserId) {
        criteria.byUserId = ObjectId.createFromHexString(filterBy.byUserId)
    }
	return criteria
}