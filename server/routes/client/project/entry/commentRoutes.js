import express from 'express'
// import checkAuth from '../middleware/checkAuth.js'
import { create, edit, seen, remove } from '../../../../controllers/client/project/entry/commentController.js'

/**
 * Entry comments routes
 */
const router = express.Router();

router.route('/:id')
    .post(create)
    .put(edit)
    .patch(seen)
    .delete(remove)
    
export default router