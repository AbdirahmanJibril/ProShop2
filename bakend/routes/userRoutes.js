import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  userProfile,
  updateUserProfile,
<<<<<<< HEAD
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
=======
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
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
<<<<<<< HEAD

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
=======
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7

export default router
