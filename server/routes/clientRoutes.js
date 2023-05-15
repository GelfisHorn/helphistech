import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import projectRoutes from './client/projectRoutes.js'

const router = express.Router();

// Client project routes
router.use('/project', checkAuth, projectRoutes)

export default router