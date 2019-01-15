const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const productsRouter = require('./routes/products')

app.use('/products', productsRouter)

app.use('/', (req, res) => {
  res.send('Visit https://ironsoul.me/backend_challenge_documentation for documentation')
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const db = process.env.MONGOLAB_URI || require('./config/keys').MONGO_URI

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to DB...')
  })
  .catch(err => console.log(err))
