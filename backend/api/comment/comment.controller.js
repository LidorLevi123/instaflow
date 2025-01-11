import { logger } from '../../services/logger.service.js'
import { commentService } from './comment.service.js'

export async function addComment(req, res) {
	try {
		const comment = req.body
		const savedComment = await commentService.add(comment)
		res.json(savedComment)
	} catch (err) {
		logger.error('Failed to add comment', err)
		res.status(400).send({ err: 'Failed to add comment' })
	}
}

export async function removeComment(req, res) {
	const { loggedinUser } = req
	const { id: commentId } = req.params

	try {
		const deletedCount = await commentService.remove(commentId)
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