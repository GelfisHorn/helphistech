import express from 'express'
// Check authentication middleware
import checkAuth from '../../middleware/checkAuth.js'
// Chack superadmin permissions middleware
import checkSuperAdmin from '../../middleware/checkSuperAdmin.js'
// Controllers
import { createAccount, authenticate, confirm, resetPassword, checkToken, newPassword, profile, editProfile, disable } from '../../controllers/es/userController.js'

const router = express.Router()

// Authentication and confirmation of Users
router.post('/', checkAuth, checkSuperAdmin, createAccount)
router.post('/login', authenticate) //Authenticate user
router.get('/confirm/:token', confirm) // Confirm user
router.post('/reset-password', resetPassword)
router.route('/reset-password/:token')
    .get(checkToken)
    .post(newPassword)

router.get('/profile', checkAuth, profile)
router.post('/edit', checkAuth, editProfile)
router.post('/disable', checkAuth, disable)

export default router