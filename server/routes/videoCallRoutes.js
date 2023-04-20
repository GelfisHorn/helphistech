import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import { getVideoCall, getVideoCalls, createVideoCall, changeState, cancelVideocall } from '../controllers/videoCallController.js'
import checkSuperAdmin from '../middleware/checkSuperAdmin.js'

const router = express.Router()

// Get specific project
router.post('/get', checkAuth, getVideoCall)

// Create videocall
router.route('/')
    .post(createVideoCall)
    .get(checkAuth, getVideoCalls)
    .put(checkAuth, changeState)
    .delete(checkAuth, checkSuperAdmin, cancelVideocall)

export default router