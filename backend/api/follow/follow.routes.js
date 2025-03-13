import express from 'express'

import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

import { add } from './follow.controller.js'

const router = express.Router()

// router.get('/', log, getComments)
router.post('/', requireAuth, add)
// router.put('/:id', requireAuth, updateComment)
// router.delete('/:id/:feedId', requireAuth, removeComment)

export const followRoutes = router