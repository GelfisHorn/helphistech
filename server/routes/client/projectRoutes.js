import express from 'express'
// Routes
import entryRoutes from './project/entryRoutes.js'
import commentRoutes from '../client/commentRoutes.js'
// Controller
import { getProject, assignClient } from '../../controllers/client/projectController.js' 
// Middleware
import checkClient from '../../middleware/checkClient.js'

const router = express.Router();

// Project entry routes
router.use('/entry', entryRoutes);
// Project comments routes (client comments)
router.use('/comment', commentRoutes);

router.route('/:id')
    .get(checkClient, getProject)
    .post(assignClient)

export default router