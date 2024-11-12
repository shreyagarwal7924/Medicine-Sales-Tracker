import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    gstin: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

  const customerModel = mongoose.model("customers", customerSchema);
  export default customerModel;