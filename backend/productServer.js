const express = require('express');
const connectDB = require('./productDB.js')
const productModel = require('./models/Products.js')
const cors = require('cors');

const app = express()

app.use(cors());
app.use(express.json())

app.get('/', async (req, res) => {
    const response = await productModel.find();
    return res.json({items: response})
  });

  connectDB()

// Only gets specific values from the database to display in a table
app.post('/getTable', async (req, res) => {
    const {email} = req.body
    try {
    const response = await productModel.find({email: email},'name packing company hsnCode mrp sellingPrice expiryDate')
    return res.json({items: response})
    }
    catch (error) {
        console.error("Error fetching products:", error)
        res.status(500).json({ message: "Internal server error" })
    }
})

app.post('/getProducts', async (req, res) => {
    const {email} = req.body
    try {
        const response = await productModel.find({email: email}, 'name hsnCode quantityinCase sellingPrice gst')
        return res.json({items: response})
    }
    catch (error) {
        console.error("Error fetching products:", error)
        res.status(500).json({ message: "Internal server error" })
    }
})

app.listen(8001, () => {
    console.log('app is running');
})
