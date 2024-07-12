const express = require('express')
const connectDB = require('./db.js')
const itemModel = require('./models/item.js')
const cors = require('cors')

const app = express()
app.use(cors());
app.use(express.json())
app.get('/', async (req, res) => {
    const response = await itemModel.find()
    return res.json({items: response})
})
connectDB()
app.listen(3001, () => {
    console.log('app is running');
})

