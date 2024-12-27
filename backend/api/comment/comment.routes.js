import express from 'express'

import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'

import { addComment } from './comment.controller.js'

const router = express.Router()

// router.get('/', log, getComments)
router.post('/', log, requireAuth, addComment)
// router.delete('/:id', requireAuth, deleteComment)

export const commentRoutes = router