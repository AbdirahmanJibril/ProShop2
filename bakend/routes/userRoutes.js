import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  userProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Register a new user
router.post('/', registerUser)

// all users Admin only

router.get('/', protect, admin, getUsers)

// user login route
router.post('/login', authUser)
//user profile route
router
  .route('/profile')
  .get(protect, userProfile)
  .put(protect, updateUserProfile)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
