import express from 'express'

import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

import { add, remove } from './follow.controller.js'

const router = express.Router()

// router.get('/', log, getComments)
router.post('/', requireAuth, add)
router.delete('/:userId', requireAuth, remove)
// router.put('/:id', requireAuth, updateComment)

export const followRoutes = router