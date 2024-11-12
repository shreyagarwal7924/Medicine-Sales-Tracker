import express from 'express';
import connectDB from './ordersDB.js';
import orderModel from './models/Orders.js';
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json())

app.get('/', async (req, res) => {
    const response = await orderModel.find({});
    return res.json({items: response})
  });

  connectDB()

  app.post('/add', async (req, res) => {
    const {email, orderNumber, name, contact, products, date, subtotal} = req.body
    try {
        const newOrder = await orderModel.create({
            email,
            orderNumber,
            name,
            contact,
            products,
            date,
            subtotal
        })
        res.status(201).json(newOrder)
    } catch (error) {
        console.log("Error adding order:", error);
        res.status(400).json({ message: error.message })
    }
})

app.post('/getTable', async (req, res) => {
    const {email} = req.body
    const response = await orderModel.find({email: email}, 'orderNumber name contact date subtotal')
    return res.json({items: response})
})

app.post('/getLastOrderNumber', async (req, res) => {
    const { email } = req.body;
    try {
        const lastOrder = await orderModel.findOne({ email })
            .sort({ orderNumber: -1 })
            .limit(1);
        
        let nextOrderNumber = 1;
        if (lastOrder) {
            nextOrderNumber = lastOrder.orderNumber + 1;
        }
        
        res.json({ nextOrderNumber });
    } catch (error) {
        console.error("Error getting last order number:", error);
        res.status(500).json({ message: "Failed to get last order number" });
    }
});

app.post('/deleteOrder', async (req, res) => {
    const { email, orderNumber } = req.body;
    try {
        const result = await orderModel.deleteOne({ email, orderNumber });
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

app.post('/getOrderDetails', async (req, res) => {
    const { email, orderNumber } = req.body;
    try {
      const order = await orderModel.findOne({ email, orderNumber });
      if (order) {
        res.json({ order });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

app.listen(7001, () => {
    console.log('app is running');
})
// onSuccess: () => {
    // queryClient.invalidateQueries(['name of the cluster])
    // }