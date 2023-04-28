import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import { getVideoCall, getVideoCalls, createVideoCall, changeState, cancelVideoCall, deleteVideoCall } from '../controllers/videoCallController.js'
import checkSuperAdmin from '../middleware/checkSuperAdmin.js'

const router = express.Router()

// Get specific project
router.post('/get', checkAuth, getVideoCall);
router.delete('/delete', checkAuth, checkSuperAdmin, deleteVideoCall);

// Create videocall
router.route('/')
    .post(createVideoCall)
    .get(checkAuth, getVideoCalls)
    .put(checkAuth, changeState)
    .delete(checkAuth, checkSuperAdmin, cancelVideoCall);

export default router