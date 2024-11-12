import mongoose from 'mongoose';
const itemSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const itemModel = mongoose.model("items", itemSchema);
export default itemModel;