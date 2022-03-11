import express from 'express'
const router = express.Router()
import { authUser, userProfile } from '../controllers/userController.js'

router.post('/login', authUser)
router.get('/profile', userProfile)

export default router
