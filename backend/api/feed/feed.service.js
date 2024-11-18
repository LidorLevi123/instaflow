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
	addCarMsg,
	removeCarMsg,
}

async function query() {
	try {
        // const criteria = _buildCriteria(filterBy)
        // const sort = _buildSort(filterBy)

		const collection = await dbService.getCollection('feed')
		const feedCursor = await collection.find()

		// if (filterBy.pageIdx !== undefined) {
		// 	feedCursor.skip(filterBy.pageIdx * PAGE_SIZE).limit(PAGE_SIZE)
		// }

		const feeds = feedCursor.toArray()
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
        
		feed.createdAt = feed._id.getTimestamp()
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

        if(res.deletedCount === 0) throw('Not your feed')
		return feedId
	} catch (err) {
		logger.error(`cannot remove feed ${feedId}`, err)
		throw err
	}
}

async function add(car) {
	try {
		const collection = await dbService.getCollection('car')
		await collection.insertOne(car)

		return car
	} catch (err) {
		logger.error('cannot insert car', err)
		throw err
	}
}

async function update(car) {
    const carToSave = { vendor: car.vendor, speed: car.speed }

    try {
        const criteria = { _id: ObjectId.createFromHexString(car._id) }

		const collection = await dbService.getCollection('car')
		await collection.updateOne(criteria, { $set: carToSave })

		return car
	} catch (err) {
		logger.error(`cannot update car ${car._id}`, err)
		throw err
	}
}

async function addCarMsg(carId, msg) {
	try {
        const criteria = { _id: ObjectId.createFromHexString(carId) }
        msg.id = makeId()
        
		const collection = await dbService.getCollection('car')
		await collection.updateOne(criteria, { $push: { msgs: msg } })

		return msg
	} catch (err) {
		logger.error(`cannot add car msg ${carId}`, err)
		throw err
	}
}

async function removeCarMsg(carId, msgId) {
	try {
        const criteria = { _id: ObjectId.createFromHexString(carId) }

		const collection = await dbService.getCollection('car')
		await collection.updateOne(criteria, { $pull: { msgs: { id: msgId }}})
        
		return msgId
	} catch (err) {
		logger.error(`cannot add car msg ${carId}`, err)
		throw err
	}
}

function _buildCriteria(filterBy) {
    const criteria = {
        vendor: { $regex: filterBy.txt, $options: 'i' },
        speed: { $gte: filterBy.minSpeed },
    }

    return criteria
}

function _buildSort(filterBy) {
    if(!filterBy.sortField) return {}
    return { [filterBy.sortField]: filterBy.sortDir }
}