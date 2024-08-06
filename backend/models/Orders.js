const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    orderNumber: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        sellingPrice: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            default: 0
        },
        gst: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    date: {
      type: String,
      required: true
    },
    subtotal: {
        type: Number,
        required: true
    }
  });

  orderSchema.index({ email: 1, orderNumber: 1 }, { unique: true });
  const orderModel = mongoose.model("orders", orderSchema);
  module.exports = orderModel;