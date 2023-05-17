import express from 'express'
import { create, edit, remove } from '../../controllers/client/commentController.js'

/**
 * Project comments routes (client comments)
 */
const router = express.Router();

router.route('/:id')
    .post(create)
    .put(edit)
    .delete(remove)
    
export default router