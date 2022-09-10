import asyncHandler from 'express-async-handler'
import Product from '../models/productmodel.js'

// search location route GET
const searchProduct = asyncHandler(async (req, res) => {
  const { keyword } = req.params

  const products = await Product.find({
    ...{ name: new RegExp(keyword, 'i') },
  })
  if (products) {
    res.json(products)
  } else {
    throw new Error('Not found')
  }
})

export default searchProduct
