import express from 'express'
import commentRoutes from '../project/entry/commentRoutes.js'
import { create, edit, remove } from '../../../controllers/client/project/entryController.js'

const router = express.Router();

// Entry comments routes (developer comments)
router.use('/comment', commentRoutes)

router.route('/:id')
    .post(create)
    .put(edit)
    .delete(remove)
    
export default router