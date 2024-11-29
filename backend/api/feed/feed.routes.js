import express from 'express'

import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'

import { getFeeds, getFeedById, addFeed, updateFeed, removeFeed, addFeedComment, removeFeedComment } from './feed.controller.js'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getFeeds)
router.get('/:id', log, getFeedById)
router.post('/', log, requireAuth, addFeed)
router.put('/:id', requireAuth, updateFeed)
router.delete('/:id', requireAuth, removeFeed)

router.post('/:id/comment', requireAuth, addFeedComment)
router.delete('/:id/comment/:commentId', requireAuth, removeFeedComment)

export const feedRoutes = router