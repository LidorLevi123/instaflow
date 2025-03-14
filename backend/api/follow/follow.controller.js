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

export async function remove(req, res) {
	const { userId } = req.params

	try {
		await followService.remove(userId)
		res.send({ msg: 'Unfollowed successfully' })
	} catch (err) {
		logger.error('Failed to unfollow', err)
		res.status(400).send({ err: 'Failed to unfollow' })
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