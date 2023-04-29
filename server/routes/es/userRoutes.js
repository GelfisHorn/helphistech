import express from 'express'
// Check authentication middleware
import checkAuth from '../../middleware/checkAuth.js'
// Chack superadmin permissions middleware
import checkSuperAdmin from '../../middleware/checkSuperAdmin.js'
// Controllers
import { getAccount, createAccount, editAccount, deleteAccount, authenticate, confirm, resetPassword, checkToken, newPassword, profile, editProfile, disable } from '../../controllers/es/userController.js'

const router = express.Router()

// Get, Create, Edit and Delete Accounts (only superadmin)
router.get('/:id', checkAuth, checkSuperAdmin, getAccount)
router.route('/')
    .post(checkAuth, checkSuperAdmin, createAccount)
    .put(checkAuth, checkSuperAdmin, editAccount)
    .delete(checkAuth, checkSuperAdmin, deleteAccount)

// Authentication and confirmation of Users
router.post('/login', authenticate) //Authenticate user
router.get('/confirm/:token', confirm) // Confirm user
router.post('/reset-password', resetPassword)
router.route('/reset-password/:token')
    .get(checkToken)
    .post(newPassword)

// Get profile
router.get('/profile', checkAuth, profile)
// Edit personal account
router.post('/edit', checkAuth, editProfile)
// Disable personal account
router.post('/disable', checkAuth, disable)

export default router