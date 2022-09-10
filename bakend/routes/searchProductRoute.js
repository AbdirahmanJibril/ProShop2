import express from 'express'

const router = express.Router()

import searchProduct from '../controllers/searchProducts.js'

router.route('/:keyword').get(searchProduct)

export default router
