import express from'express';
import connectDB from './ordersDB.js'
import customerModel from './models/Customers.js';
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json())

app.get('/', async (req, res) => {
    const response = await customerModel.find({});
    return res.json({items: response})
});

connectDB()

app.listen(9001, () => {
    console.log('app is running');
})