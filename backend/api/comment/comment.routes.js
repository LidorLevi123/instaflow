import express from 'express'

import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'

import { addComment, removeComment, updateComment } from './comment.controller.js'

const router = express.Router()

// router.get('/', log, getComments)
router.post('/', log, requireAuth, addComment)
router.put('/:id', requireAuth, updateComment)
router.delete('/:id', requireAuth, removeComment)

export const commentRoutes = router