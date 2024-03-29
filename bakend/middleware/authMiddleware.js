import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import { User } from '../models/usermodel.js'

const protect = expressAsyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id)
    } catch (error) {
      res.status(401)
      throw new Error('Not authorised')
    }
    next()
  }
  if (!token) {
    res.status(401)
    throw new Error('Unauthorised token not found')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
