const mongoose = require('mongoose')
const itemSchema = new mongoose.Schema({
    email: String,
    password: String
})

const itemModel = mongoose.model("Item", itemSchema);
module.exports = itemModel;