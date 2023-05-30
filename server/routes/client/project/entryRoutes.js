import express from 'express'
import commentRoutes from '../project/entry/commentRoutes.js'
import { getEntries, get, create, edit, remove } from '../../../controllers/client/project/entryController.js'

const router = express.Router();

// Entry comments routes (developer comments)
router.use('/comment', commentRoutes)

router.get('/:project', getEntries);

router.route('/:id')
    .get(get)
    .post(create)
    .put(edit)
    .delete(remove)
    
export default router