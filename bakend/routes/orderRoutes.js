import express from 'express'
const router = express.Router()
import {
  orderCreate,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, orderCreate)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
export default router
