import asyncHandler from 'express-async-handler'
import { User } from '../models/usermodel.js'
import bcrypt from 'bcryptjs'
import { Router } from 'express'

// POS api/user/login

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token: null,
    })
  } else {
    res.status(401)
    throw new Error('Not authorised email or password invalid')
  }
})
const userProfile = asyncHandler(async (req, res) => {
  res.send('success')
})
export { authUser, userProfile }
