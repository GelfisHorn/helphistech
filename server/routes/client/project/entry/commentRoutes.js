import express from 'express'
// import checkAuth from '../middleware/checkAuth.js'
import { create, edit, remove } from '../../../../controllers/client/project/entry/commentController.js'

/**
 * Entry comments routes (developer comments)
 */
const router = express.Router();

router.route('/:id')
    .post(create)
    .put(edit)
    .delete(remove)
    
export default router