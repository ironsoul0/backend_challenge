const express = require('express')
const Product = require('../models/product.model')

const router = express.Router()

router.get('/single_product', async (req, res) => {
  const product_title = req.body.title
  if (!product_title) {
    res.json({
      message: 'Provide title of the requested product'
    })
  } else {
    const targetProduct = await Product.findOne({
      title: product_title
    })
    if (!targetProduct) {
      res.json({
        message: 'No product with such title'
      })
    } else {
      res.json(targetProduct)
    }
  }
})

router.get('/all_products', async (req, res) => {
  const { only_available } = req.body
  try {
    let products = null
    if (only_available === '1') {
      products = await Product.find().where('inventory_count').gt(0)
    } else {
      products = await Product.find().where('inventory_count')
    }
    res.send(products)
  }
  catch (err) {
    res.json({
      message: 'Products were not retrieved'
    })
  }
})

router.put('/purchase_product', async (req, res) => {
  const product_title = req.body.title
  if (!product_title) {
    res.json({
      message: 'Provide title of the requested product'
    })
  } else {
    const product = await Product.findOne({
      title: product_title
    })
    if (!product) {
      res.json({
        message: 'No product with such title'
      })
    } else {
      if (product.inventory_count > 0) {
        await Product.findByIdAndUpdate(product._id, { $set: { inventory_count: product.inventory_count - 1 } })
        res.json({
          message: 'Purchase completed',
          new_inventory_count: product.inventory_count - 1
        })
      } else {
        res.json({
          message: 'Inventory count of the product is zero'
        })
      }
    }
  }
})

module.exports = router