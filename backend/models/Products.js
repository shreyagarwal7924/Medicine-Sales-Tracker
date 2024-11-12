import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true 
    },
    name: {
        type: String,
        required: true
    },
    packing : {
        type: String,
        required: true
    },
    boxorpieces: {
        type: String,
        required: true
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
    },
    quantity: {
        type: Number,
        rerquired: true
    }
  });

  const productModel = mongoose.model("products", productSchema);
  export default productModel;