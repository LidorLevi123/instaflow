import { logger } from '../../services/logger.service.js'
import { commentService } from './comment.service.js'

export async function addComment(req, res) {
	const { loggedinUser } = req

	try {
		const comment = {
			by: loggedinUser,
			txt: req.body.txt,
			aboutFeedId: req.body.aboutFeedId,
		}
		const savedComment = await commentService.add(comment)
		res.json(savedComment)
	} catch (err) {
		logger.error('Failed to add comment', err)
		res.status(400).send({ err: 'Failed to add comment' })
	}
}