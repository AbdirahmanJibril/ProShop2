import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  userProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

// Register a new user
router.post('/', registerUser)
// user login route
router.post('/login', authUser)
//user profile route
router.route('/profile').get(protect, userProfile)

export default router
