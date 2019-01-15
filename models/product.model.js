const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  inventory_count: {
    type: Number,
    required: true
  }
})

module.exports = Product = mongoose.model('Product', ProductSchema)