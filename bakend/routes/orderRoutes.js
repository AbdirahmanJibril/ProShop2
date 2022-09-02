import express from 'express'
const router = express.Router()
import {
  orderCreate,
  getOrderById,
  updateOrderToPaid,
<<<<<<< HEAD
  getOrders,
  getMyOrders,
  updateOrderToDelivered,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, orderCreate).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
=======
  getMyOrders,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, orderCreate)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
export default router
