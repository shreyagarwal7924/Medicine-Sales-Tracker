const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            'mongodb+srv://shreyagarwal7924:TI4Ck2JKugHQBBYb@cluster0.woc8pj0.mongodb.net/Orders?retryWrites=true&w=majority&appName=Cluster0'
            );
            console.log(`MongoDB connected: Orders`);
    }
    catch(error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;