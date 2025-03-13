import { logger } from '../../services/logger.service.js'
import { followService } from './follow.service.js'

export async function add(req, res) {
	try {
		const follow = req.body || null
		if(!follow) return res.status(400).send({ err: 'Failed to follow user' })
		const savedFollow = await followService.add(follow)
		res.json(savedFollow)
	} catch (err) {
		logger.error('Failed to follow user', err)
		res.status(400).send({ err: 'Failed to follow user' })
	}
}

export async function removeComment(req, res) {
	const { loggedinUser } = req
	const { id: commentId, feedId } = req.params

	try {
		const deletedCount = await commentService.remove(commentId, feedId)
		if (deletedCount < 1) {
			logger.warn(`${loggedinUser.username} is illegaly attemping to remove comments`)
			return res.status(403).send({ err: 'Cannot remove comment' })
		}
		res.send({ msg: 'Removed comment successfully' })
	} catch (err) {
		logger.error('Failed to remove comment', err)
		res.status(400).send({ err: 'Failed to remove comment' })
	}
}

export async function updateComment(req, res) {
	const comment = req.body
	
	try {
		const updatedComment = await commentService.update(comment)
		res.json(updatedComment)
	} catch (err) {
		logger.error('Failed to update comment', err)
		res.status(400).send({ err: 'Failed to update comment' })
	}
}