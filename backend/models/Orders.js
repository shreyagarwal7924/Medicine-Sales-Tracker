const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    product: {
        type: Array,
        required: true
    },
    date: {
      type: String,
      required: true
    }
  });

  const orderModel = mongoose.model("orders", orderSchema);
  module.exports = orderModel;