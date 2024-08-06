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
    const response = await productModel.find({email: email},'name packing company hsnCode mrp sellingPrice expiryDate quantity')
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

app.post('/addProduct', async (req, res) => {
    const {email,name, description, hsnCode, packing, company, boxorpieces,mrp,quantityinCase, costPrice, sellingPrice, expiryDate, gst, quantity} = req.body
    try {
        const newOrder = await productModel.create({
            email,
            name,
            description,
            hsnCode, 
            packing, 
            company, 
            boxorpieces,
            mrp,
            quantityinCase, 
            costPrice, 
            sellingPrice, 
            expiryDate, 
            gst, 
            quantity
        })
        res.status(201).json(newOrder)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.post('/deleteProduct', async(req, res) => {
    const { email, name, packing } = req.body;
    try {
        const result = await productModel.deleteOne({ email, name, packing });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Order deleted successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    }
    catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

app.post('/getProductDetails', async (req, res) => {
    const { email, name, packing } = req.body;
    try {
      const product = await productModel.findOne({ email, name, packing });
      if (product) {
        res.json({ product });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

app.listen(8001, () => {
    console.log('app is running');
})
