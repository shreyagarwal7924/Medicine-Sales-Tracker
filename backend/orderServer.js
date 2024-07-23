const express = require('express');
const connectDB = require('./ordersDB.js')
const orderModel = require('./models/Orders.js')
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json())

app.get('/', async (req, res) => {
    const response = await orderModel.find();
    return res.json({items: response})
  });

  connectDB()

app.post('/add', async (req, res) => {
    const {orderNumber, name, contact, product, date} = req.body
    try {
        const newOrder = await orderModel.create(req.body)
        res.status(201).json(newOrder)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Only gets specific values from the database to display in a table
app.get('/getTable', async (req, res) => {
    const response = await orderModel.find({}, 'orderNumber name contact date')
    return res.json({items: response})
})

app.listen(7001, () => {
    console.log('app is running');
})
