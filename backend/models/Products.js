const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true 
    },
    name: {
        type: String,
        required: 12
    },
    packing : {
        type: String,
        required: true
    },
    pieces: {
        type: Number,
    },
    box: {
        type: Number,
    },
    company: {
      type: String,
      required: true
    },
    hsnCode: {
        type: Number,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    quantityinCase: {
        type: Number,
        required: true
    },
    costPrice: {
        type: Number,
        required: true
    }, 
    sellingPrice: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    gst: {
        type: Number,
        required: true
    }
  });

  const productModel = mongoose.model("products", productSchema);
  module.exports = productModel;